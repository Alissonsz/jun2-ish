import classNames from "classnames";
import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
    return(
        <div className={classNames("px-4 pt-2 columns is-fullwidth", styles.header)}>
            <div className="column is-2">MAX VISITAS</div>
            <div className={classNames("column is-justify-content-flex-end", styles.rightSide)}>
                <div className="columns has-text-weight-semibold has-text-black is-flex is-justify-content-flex-end">
                    <a className="column is-1">Início</a>
                    <a className="column is-1">Serviços</a>
                    <a className="column is-2">Perguntas frequentes</a>
                    <a className="column is-1">Contato</a>
                </div>
            </div>
        </div>
    );
}

export default Header;