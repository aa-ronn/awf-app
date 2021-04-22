import { FC, Fragment, useEffect, useState } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { LinkBlock } from "./link-block/link-block.component";
import "./sidebar.styles.scss";
import { UserDetailsBlock } from "./user-details-block/user-details-block.component";

interface ISidebar {
  title?: string;
}

export const Sidebar: FC<ISidebar> = ({ title }) => {
  const { width } = useWindowDimensions();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    if (width <= 540) {
      setMenuIsOpen(false);
    }
  }, [width]);

  const SidebarContent = () => (
    <Fragment>
      <h2>{!title ? "🐵 Tasks" : title}</h2>
      <UserDetailsBlock />
      <div className="link-blocks">
        <LinkBlock text="📓  Projects" urlPath="/" />
        <LinkBlock text="📖  Tasks" urlPath="/tasks" />
      </div>
    </Fragment>
  );

  if (width <= 540) {
    return (
      <>
        <div
          className={`nav-icon ${menuIsOpen ? "menu-open" : "menu-closed"}`}
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          <div></div>
        </div>
        <aside
          className={`sidebar-component ${
            menuIsOpen ? "menu-open" : "menu-closed"
          }`}
        >
          <SidebarContent />
        </aside>
      </>
    );
  } else {
    return (
      <aside className="sidebar-component">
        <SidebarContent />
      </aside>
    );
  }
};
