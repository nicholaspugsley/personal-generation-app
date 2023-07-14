import { useState, useEffect } from "react";
import Link from "next/link";

const UserNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link href="/user/tools/super-prompt">
        <a
          className={`nav-link ${current === "/user/super-prompt" && "active"}`}
        >
          Super Prompt
        </a>
      </Link>
      <Link href="/user/tools">
        <a className={`nav-link ${current === "/user/tools" && "active"}`}>
          Tools
        </a>
      </Link>
      <Link href="/user/vault">
        <a className={`nav-link ${current === "/user/vault" && "active"}`}>
          Vault
        </a>
      </Link>
      <Link href="/user">
        <a className={`nav-link ${current === "/user" && "active"}`}>
          Dashboard
        </a>
      </Link>
      <Link href="/user/tools/youtube">
        <a
          className={`nav-link ${
            current === "/user/tools/youtube" && "active"
          }`}
        >
          Youtube Tools
        </a>
      </Link>
      <Link href="/user/tools/midjourney">
        <a
          className={`nav-link ${
            current === "/user/tools/midjourney" && "active"
          }`}
        >
          Mid-Jouney Prompt
        </a>
      </Link>
    </div>
  );
};

export default UserNav;
