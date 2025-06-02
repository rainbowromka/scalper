import React, {Component} from "react";

import AppStore from "../store/AppStore";

export default class FullScreenLayout extends Component<{ store: AppStore, children: any }, any> {
    render() {
        return (
            <div className={"variables"} style={{height: "100vh", display: "flex", flexDirection: "column"}}>
                <main style={{ minWidth: "100%", minHeight: "100vh", maxHeight: "100vh", display: "flex", flexDirection: "column", flexGrow: "1" }}>
                    { this.props.children }
                </main>
            </div>
        )
    }
}
