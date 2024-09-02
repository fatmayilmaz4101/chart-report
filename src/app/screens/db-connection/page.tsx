"use client";
import React, { useEffect, useRef, useState } from "react";
import { FormField } from "@/app/components/form-field/page";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { connectToDatabase, DbType } from "@/app/services/DbConnectionService";
import { CharTypeOptions, DbSystemOptions } from "@/app/enums/DbSystem";
import { Toast } from "primereact/toast";
import PopUp from "@/app/components/pop-up/page";
import { getViews, ViewType } from "@/app/services/DbService";
import { useRouter } from "next/navigation";

const DbConnection = () => {
  const toast = useRef<Toast>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [viewResponse, setViewResponse] = useState<ViewType[]>();
  const [resp, setResp] = useState<{ view: string; columns: string[] }[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const router = useRouter();

  const handleLineChart = (viewData: ViewType) => {
    // Serialize the columns array to a JSON string and encode it
    const columnsString = encodeURIComponent(JSON.stringify(viewData.columns));

    // Create query parameters string
    const queryParams = new URLSearchParams({
      view: viewData.view,
      columns: columnsString, // Send as a JSON string
    }).toString();

    // Construct the full URL
    const url = `/components/line-chart?${queryParams}`;

    router.replace(url);
  };

  const { control, handleSubmit } = useForm<DbType>();
  const {
    control: popControl,
    handleSubmit: popHandle,
    watch,
    setValue,
  } = useForm<popupType>();

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
          const response = await getViews(connectionStr);
          setViewResponse(response);
          showSuccess("Views fetched successfully");

          const formattedResp =
            response?.map((v) => ({
              view: v.view,
              columns: v.columns,
            })) || [];
          await setResp(formattedResp);
          console.log(response);
        } catch (error) {
          console.error("Get view error: ", error);
          showError("No views found in the database");
        }
      })();
    }
  }, [connectionStr]);

  useEffect(() => {
    console.log("views: ", viewResponse);
  }, [viewResponse]);

  const onSubmit = async (data: DbType) => {
    console.log("data: ", data);
    try {
      const response = await connectToDatabase(data);
      setConnectionStr(response);
      showSuccess("Database connection successful.");
      togglePopup();
      console.log("connection successful: ", response);
      await console.log("resp: ", resp);
    } catch (error) {
      console.error("Connection error: ", error);
      showError("Failed to connect to the database.");
    }
  };

  interface popupType {
    selectedView: string;
    chart: string;
    columns: string[];
    x: string,
    y: string[]
  }
  useEffect(()=>{
    const y = watch("y");
    
  },[watch("y")])
  useEffect(() => {
    const selectedView = watch("selectedView");
    const func = async () => {
      if (selectedView) {
        const view = await resp.find((r) => r.view === selectedView);
        if (view) {
          setSelectedColumns(view.columns);
          setValue("columns", []);
        }
      }
    };
    func();
  }, [watch("selectedView")]);

  const onSubmitt = async (data: popupType) => {
    const selectedView = resp.find((r) => r.view === data.selectedView);
    if (!selectedView) return;
    if (data.chart == "Line Chart") {
      handleLineChart(selectedView);
    } else if (data.chart == "Bar Chart") {
      router.replace("/components/line-chart");
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="card col-6 p-fluid">
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
          onClick={handleSubmit(onSubmit)}
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
            control={popControl}
            required="View selection is required"
            options={resp.map((r) => ({ label: r.view, value: r.view }))}
            name="selectedView"
            label="Select view"
          />
          <FormField
            type="dropdown"
            control={popControl}
            required="Chart type is required"
            options={CharTypeOptions}
            name="chart"
            label="Select chart type"
          />
          {selectedColumns.length > 0 && (
            <>
              <FormField
                type="multiselect"
                control={popControl}
                required="Column selection is required"
                options={selectedColumns.map((col) => ({
                  label: col,
                  value: col,
                }))}
                name="y"
                label="Select columns"
              />
              <FormField
                type="dropdown"
                control={popControl}
                required="Row selection is required"
                options={selectedColumns.map((col) => ({
                  label: col,
                  value: col,
                }))}
                name="x"
                label="Select row"
              />
            </>
          )}
          <Button
            onClick={popHandle(onSubmitt)}
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
