import React, {Component} from 'react';

class Hero extends Component {


    render() {
        const {hero, children} = this.props;
        return (
            <header className={hero}>
                {children}
            </header>
        );

    }

}

Hero.defaultProps = {
    hero: "defaultHero"
}
export default Hero;