import React, { useEffect, useRef } from "react";
import { canUseDOM } from "vtex.render-runtime";

interface SELauncherProps {

}

const escapeKey = 27;

const siteEditorKeys = {
  self: 83, // S
  blank: 78 // N
}

const shortcutKeys = {
  copy: 67 // C
}

const SELauncher: StorefrontFunctionComponent<SELauncherProps> = ({ }) => {
  const escapeFlag = useRef(false);

  useEffect(() => {
    if (!canUseDOM) return;

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    }
  })

  const keyDown = (e: any) => {
    if (e.repeat) return;
    if (e.keyCode === escapeKey) escapeFlag.current = true;
    if (!escapeFlag.current) return;

    if (e.keyCode === shortcutKeys.copy) copyPath();
    if (e.keyCode === siteEditorKeys.self) launch("_self");
    if (e.keyCode === siteEditorKeys.blank) launch("_blank");
  }

  const keyUp = (e: any) => {
    if (e.keyCode === escapeKey) escapeFlag.current = false;
  }

  const copyPath = () => {
    if (!canUseDOM) return;
    const textToCopy = window.location.href.split(".com")[1];
    navigator.clipboard.writeText(textToCopy);
  }

  const launch = (destination: string) => {
    if (!canUseDOM) return;
    escapeFlag.current = false;

    const pathToEdit = window.location.href.split(".com/")[1];
    window.open(`https://eriksbikeshop.myvtex.com/admin/cms/site-editor/${pathToEdit}`, destination);
  }

  return <div style={{ display: "none" }} data-info="Site Editor Launcher 1.0.1" />
}

SELauncher.schema = {
  title: "Site Editor Launcher",
  type: "object",
  properties: {}
}

export default SELauncher;