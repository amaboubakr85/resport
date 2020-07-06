import React, {Component} from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from "react-router-dom";

export default class ErrorPage extends Component {
    render() {
        return (
            <div>
                <Hero>
                  <Banner title="404" subtitle="Page Not Found">
                    <Link to="/" className="btn-primary">Return home</Link>
                  </Banner>
                </Hero>
            </div>
        );
    }
}
