import React, { Component } from 'react';
import classNames from 'classnames';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SideMenu } from '../Menu/SideMenu';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../pages/HomePage/HomePage';
import ShiftActionPage from '../../pages/ShiftActionPage/ShiftActionPage';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '../../styles/styles.scss';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
// import './App.scss';
import Logo from '../../assets/images/logo.svg';
import LogoWhite from '../../assets/images/logo-white.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      layoutMode: 'static',
      layoutColorMode: 'light',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
    };

    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.createMenu();
  }

  onWrapperClick() {
    if (!this.menuClick) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }

    this.menuClick = false;
  }

  onToggleMenu(event) {
    this.menuClick = true;

    if (this.isDesktop()) {
      if (this.state.layoutMode === 'overlay') {
        this.setState({
          overlayMenuActive: !this.state.overlayMenuActive,
        });
      } else if (this.state.layoutMode === 'static') {
        this.setState({
          staticMenuInactive: !this.state.staticMenuInactive,
        });
      }
    } else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({
        mobileMenuActive: !mobileMenuActive,
      });
    }

    event.preventDefault();
  }

  onSidebarClick() {
    this.menuClick = true;
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }
  }

  createMenu() {
    this.menu = [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
      {
        label: 'Menu Modes',
        icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Static Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutMode: 'static' }) },
          { label: 'Overlay Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutMode: 'overlay' }) },
        ],
      },
    ];
  }

  addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else element.className += ' ' + className;
  }

  removeClass(element, className) {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' ',
      );
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  componentDidUpdate() {
    if (this.state.mobileMenuActive) this.addClass(document.body, 'body-overflow-hidden');
    else this.removeClass(document.body, 'body-overflow-hidden');
  }

  render() {
    const logo = this.state.layoutColorMode === 'dark' ? LogoWhite : Logo;

    const wrapperClass = classNames('layout-wrapper', {
      'layout-overlay': this.state.layoutMode === 'overlay',
      'layout-static': this.state.layoutMode === 'static',
      'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
      'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });

    const sidebarClassName = classNames('layout-sidebar', {
      'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
      'layout-sidebar-light': this.state.layoutColorMode === 'light',
    });

    return (
      <div className={wrapperClass} onClick={this.onWrapperClick}>
        <Header onToggleMenu={this.onToggleMenu} />

        <div ref={el => (this.sidebar = el)} className={sidebarClassName} onClick={this.onSidebarClick}>
          <div className="layout-logo">
            <img alt="Logo" src={logo} />
          </div>
          <SideMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
        </div>

        <div className="layout-main">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/shift/add" component={ShiftActionPage} />
            <Route path="/shift/edit/:id" component={ShiftActionPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
        <Footer />
        <div className="layout-mask"></div>
      </div>
    );
  }
}

export default App;
