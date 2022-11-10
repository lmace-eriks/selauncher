import React, { useEffect, useState, useRef } from "react";
import { canUseDOM } from "vtex.render-runtime";

import styles from "./styles.css";

interface SELauncherProps {

}

const escapeKey = 27;

const siteEditorKeys = {
  self: 83, // S
  blank: 78 // N
}

const shortcutKeys = {
  help: 72, // H
  copy: 67 // C
}

const masterHost = "www.eriksbikeshop.com";
const masterAdmin = "https://eriksbikeshop.myvtex.com/admin/cms/site-editor";

const SELauncher: StorefrontFunctionComponent<SELauncherProps> = ({ }) => {
  const escapeFlag = useRef(false);
  const [helpActive, setHelpActive] = useState(false);

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

    if (e.keyCode === shortcutKeys.help) setHelpActive(!helpActive);
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

    const myLocation = window.location;
    const hostName = myLocation.hostname;
    const devAdmin = myLocation.origin + "/admin/cms/site-editor";

    const adminHost = hostName === masterHost ? masterAdmin : devAdmin;
    const pathToEdit = myLocation.pathname;

    window.open(`${adminHost}${pathToEdit}`, destination);
  }

  const HelpMenu = () => (
    <div className={styles.container}>
      <button onClick={() => setHelpActive(false)} className={styles.closeMenuButton}>X</button>
      <p className={styles.helpTitle}>ESC Key Tools - Help Menu</p>
      <ul className={styles.helpList}>
        <li className={styles.helpListItem}>
          <div className={styles.keyStroke}>ESC + C:</div>
          <div className={styles.description}>Copy text from URL after .com to clipboard.</div>
        </li>
        <li className={styles.helpListItem}>
          <div className={styles.keyStroke}>ESC + S:</div>
          <div className={styles.description}>Open Site Editor for current page in current tab.</div>
        </li>
        <li className={styles.helpListItem}>
          <div className={styles.keyStroke}>ESC + N:</div>
          <div className={styles.description}>Open Site Editor for current page in new tab.</div>
        </li>
        <li className={styles.helpListItem}>
          <div className={styles.keyStroke}>ESC + H:</div>
          <div className={styles.description}>Toggle help menu visibility.</div>
        </li>
      </ul>
      <p className={styles.featureRequest}>For any feature requests, please contact<br />your Front End Web Developer.</p>
    </div>
  )

  return (
    <>
      {helpActive && <HelpMenu />}
      <div style={{ display: "none" }} data-info="Site Editor Launcher 1.0.2" />
    </>
  )
}

SELauncher.schema = {
  title: "Site Editor Launcher",
  type: "object",
  properties: {}
}

export default SELauncher;