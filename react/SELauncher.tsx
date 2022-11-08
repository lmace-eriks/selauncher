import React, { useEffect, useRef, useState } from "react";
import { canUseDOM } from "vtex.render-runtime";

interface SELauncherProps {

}

const SELauncher: StorefrontFunctionComponent<SELauncherProps> = ({ }) => {

  return <>SE Launcher</>
}

SELauncher.schema = {
  title: "Site Editor Launcher",
  type: "object",
  properties: {}
}

export default SELauncher;