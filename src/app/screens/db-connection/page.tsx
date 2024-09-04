"use client";
import React, { useEffect, useRef, useState } from "react";
import { FormField } from "@/app/components/form-field/page";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { connectToDatabase, DbType } from "@/app/services/DbConnectionService";
import { CharTypeOptions, DbSystemOptions } from "@/app/enums/DbSystem";
import { Toast } from "primereact/toast";
import PopUp from "@/app/components/pop-up/page";
import { getFunctions, getViews } from "@/app/services/DbService";
import { useRouter } from "next/navigation";
import { RedirectToChartFormType } from "@/app/types";

const DbConnection = () => {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [resp, setResp] = useState<{ view: string; columns: string[] }[]>([]);
  const [funcResp, setFuncResp] = useState<
    { func: string; columns: string[] }[]
  >([]);
  const [selectedView, setSelectedView] = useState("");
  const [selectedFunc, setSelectedFunc] = useState("");
  const [viewColumns, setViewColumns] = useState<string[]>([]);
  const [funcColumns, setFuncColumns] = useState<string[]>([]);

  const handleLineChart = (
    x: string,
    y: string[],
    viewName: string,
    connStr: string,
    isFunc: boolean
  ) => {
    const columnsString = encodeURIComponent(JSON.stringify(y));
    const queryParams = new URLSearchParams({
      x,
      y: columnsString,
      viewName,
      connStr,
      isFunc: isFunc.toString(),
    }).toString();
    const url = `/components/line-chart?${queryParams}`;
    router.replace(url);
  };

  const handleBarChart = (
    x: string,
    y: string[],
    viewName: string,
    connStr: string,
    isFunc: boolean
  ) => {
    const columnsString = encodeURIComponent(JSON.stringify(y));
    const queryParams = new URLSearchParams({
      x,
      y: columnsString,
      viewName,
      connStr,
      isFunc: isFunc.toString(),
    }).toString();
    const url = `/components/bar-chart?${queryParams}`;
    router.replace(url);
  };

  const { control, handleSubmit } = useForm<DbType>();
  const {
    control: popUpControl,
    handleSubmit: popUpHandle,
    watch,
    setValue,
  } = useForm<RedirectToChartFormType>();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const showError = (message: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const [connectionStr, setConnectionStr] = useState<string>("");

  useEffect(() => {
    if (connectionStr) {
      (async () => {
        try {
          const viewResponse = await getViews(connectionStr);
          showSuccess("Views fetched successfully");
          const formattedView =
            viewResponse?.map((v) => ({
              view: v.view,
              columns: v.columns,
            })) || [];
          await setResp(formattedView);
          const funcResponse = await getFunctions(connectionStr);

          showSuccess("Functions fetched successfully");
          const formattedFunc =
            funcResponse?.map((v) => ({
              func: v.func,
              columns: v.columns,
            })) || [];
          await setFuncResp(formattedFunc);
        } catch (error) {
          console.error("Get view or func error: ", error);
          showError("No views or functions found in the database");
        }
      })();
    }
  }, [connectionStr]);

  const connectToDb = async (data: DbType) => {
    try {
      const response = await connectToDatabase(data);
      await setConnectionStr(response);
      showSuccess("Database connection successful.");
      togglePopup();
    } catch (error) {
      console.error("Connection error: ", error);
      showError("Failed to connect to the database.");
      return;
    }
  };

  useEffect(() => {
    const selectedView = watch("selectedView");
    const selectedFunc = watch("selectedFunction");

    const fetchColumns = async () => {
      setSelectedView(selectedView);
      const view = await resp.find((r) => r.view === selectedView);

      if (view) {
        setViewColumns(view.columns);
        setValue("columns", []);
      }

      setSelectedFunc(selectedFunc);
      const func = await funcResp.find((r) => r.func === selectedFunc);

      if (func) {
        setFuncColumns(func.columns);
        setValue("columns", []);
      }
    };
    fetchColumns();
  }, [watch("selectedView"), watch("selectedFunction")]);

  const redirectToChart = async (data: RedirectToChartFormType) => {
    const selectedView = resp.find((r) => r.view === data.selectedView);
    const selectedFunc = funcResp.find((r) => r.func === data.selectedFunction);

    if (selectedView) {
      const isFunc = false;
      if (data.chart === "Line Chart") {
        handleLineChart(
          data.x,
          data.y,
          selectedView.view,
          connectionStr,
          isFunc
        );
      } else if (data.chart === "Bar Chart") {
        handleBarChart(
          data.x,
          data.y,
          selectedView.view,
          connectionStr,
          isFunc
        );
      }
    } else if (selectedFunc) {
      const isFunc = true;
      if (data.chart === "Line Chart") {
        handleLineChart(
          data.x,
          data.y,
          selectedFunc.func,
          connectionStr,
          isFunc
        );
      } else if (data.chart === "Bar Chart") {
        handleBarChart(
          data.x,
          data.y,
          selectedFunc.func,
          connectionStr,
          isFunc
        );
      }
    } else {
      console.error("Neither view nor function was selected.");
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="card col-12 p-fluid">
        <FormField
          type="dropdown"
          control={control}
          required="System field is required"
          options={DbSystemOptions}
          name="system"
          label="System"
        />
        <FormField
          type="text"
          control={control}
          required="Server field is required"
          name="server"
          label="Server"
        />
        <FormField
          type="text"
          control={control}
          required="User field is required"
          name="username"
          label="Username"
        />
        <FormField
          type="text"
          control={control}
          required="Password field is required"
          name="password"
          label="Password"
        />
        <FormField
          type="text"
          control={control}
          required="Database field is required"
          name="database"
          label="Database"
        />
        <Button
          onClick={handleSubmit(connectToDb)}
          label="Connect"
          severity="success"
          text
          raised
        />
      </div>
      <PopUp show={showPopup} onClose={togglePopup}>
        <h2 className="text-center">Select object</h2>
        <div className="card col-12 p-fluid">
          <FormField
            type="dropdown"
            control={popUpControl}
            options={resp.map((r) => ({ label: r.view, value: r.view }))}
            name="selectedView"
            label="Select view"
            disabled={!!selectedFunc} // Diğer alan seçiliyse devre dışı bırak
          />
          <div
            style={{
              margin: "10px",
              textAlign: "center",
            }}
          >
            OR
          </div>
          <FormField
            type="dropdown"
            control={popUpControl}
            options={funcResp.map((r) => ({ label: r.func, value: r.func }))}
            name="selectedFunction"
            label="Select function"
            disabled={!!selectedView} // Diğer alan seçiliyse devre dışı bırak
          />

          <FormField
            type="dropdown"
            control={popUpControl}
            required="Chart type is required"
            options={CharTypeOptions}
            name="chart"
            label="Select chart type"
          />
          {viewColumns.length > 0 && selectedView && (
            <>
              <FormField
                type="dropdown"
                control={popUpControl}
                required="Column selection is required"
                options={viewColumns.map((col) => ({
                  label: col,
                  value: col,
                }))}
                name="y"
                label="Select columns (numerical data required)"
              />
              <FormField
                type="dropdown"
                control={popUpControl}
                required="Row selection is required"
                options={viewColumns.map((col) => ({
                  label: col,
                  value: col,
                }))}
                name="x"
                label="Select row"
              />
            </>
          )}

          {funcColumns.length > 0 && selectedFunc && (
            <>
              <FormField
                type="dropdown"
                control={popUpControl}
                required="Column selection is required"
                options={funcColumns.map((col) => ({
                  label: col,
                  value: col,
                }))}
                name="y"
                label="Select columns (sayısal veriler, tarih vb)"
              />
              <FormField
                type="dropdown"
                control={popUpControl}
                required="Row selection is required"
                options={funcColumns.map((col) => ({
                  label: col,
                  value: col,
                }))}
                name="x"
                label="Select row"
              />
            </>
          )}
          <Button
            onClick={popUpHandle(redirectToChart)}
            label="Submit"
            severity="success"
            text
            raised
          />
        </div>
      </PopUp>
    </>
  );
};

export default DbConnection;
