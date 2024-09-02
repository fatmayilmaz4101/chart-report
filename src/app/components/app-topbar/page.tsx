import Link from "next/link";
import React, {
  forwardRef,
} from "react";

const AppTopbar = forwardRef(() => {
  return (
    <div className="layout-topbar">
      <Link href="/" className="layout-topbar-logo">
        <span>Chart Reporting</span>
      </Link>

    </div>
  );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
