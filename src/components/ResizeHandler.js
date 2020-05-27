import React from "react";
import * as PropTypes from "prop-types"

const sizes = {
    480: "phone",
    768: "tablet",
    992: "desktop",
    1200: "wide-desktop",
    1920: "hd-desktop"
};

class ResizeHandler extends React.Component {
    static childContextTypes = {
        rwd: PropTypes.object
    };

    width = 0;
    state = {
        screen: "",
        name: ""
    };

    constructor(props) {
        super(props);

        const screen = this.getScreen();
        this.state = { screen, name: sizes[screen] };
    }

    getChildContext() {
        return {
            rwd: {
                screen: this.state.screen,
                name: this.state.name,
                getWidth: () => this.width
            }
        };
    }

    onResize = () => {
        const screen = this.getScreen();
        if (screen !== this.state.screen) {
            this.setState({ screen, name: sizes[screen] });
            this.forceUpdate();
        }
    };

    getScreen() {
        this.width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        for (const i in sizes) {
            const size = parseInt(i);
            if (this.width <= size) {
                return size;
            }
        }

        return 1200;
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    render() {
        return this.props.children;
    }
}

export default ResizeHandler;
