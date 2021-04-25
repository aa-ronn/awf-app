import { FC, Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

  useEffect(() => {
    if (width <= 768) {
      setMenuIsOpen(false);
    }
  }, [width]);

  const SidebarContent = () => (
    <Fragment>
      <h2 className="sidebar-title" onClick={() => history.push("/")}>
        {!title ? "🐵 Projects" : title}
      </h2>
      <UserDetailsBlock />
      <div className="link-blocks">
        <LinkBlock text="📓  Projects" urlPath="/" />
        <LinkBlock text="📖  Your Tasks" urlPath="/tasks" />
      </div>
    </Fragment>
  );

  if (width <= 768) {
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
