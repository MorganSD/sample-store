import React, { Component } from "react";
import "../style/sidebar.css";
import navigationIcon from "../Icon Simplestore/apple-keyboard-control.png";
import formaloo from '../Icon Simplestore/formaloo-01.png';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      brands: []
    };
  }

  componentDidMount() {
    let brands = fetch("http://api.projectant.aasoo.ir/shelves/brands/list/", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": "0f855b9c2f5ee2a21e530bcaa82a645286724fba",
        accept: "application/json",
        "x-store-sub-address": "sib"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.data.brands);
        this.setState({
          brands: response.data.brands
        });
      });
  }

  render() {
    return (
      <section className="sidebar">
        <div className="logo">
          <img src={formaloo} />
          <p>فرم ساز آنلاین فرمالو</p>
        </div>
        <ul className="catSideBar">
          <li className="catBranches">
            <input type="checkbox" id="navigation-icon" className="inputDN" />
            <label for="navigation-icon">
              <p>برندها</p>
              <img src={navigationIcon} />
            </label>
            <ul className="sidebar-cat-content">
              {this.state.brands ? (
                this.state.brands.map(brand => (
                  <li key={brand.title}>{brand.title}</li>
                ))
              ) : (
                <li>یرندی ثبت نشده است</li>
              )}
            </ul>
          </li>

          <li className="catBranches">
            <input type="checkbox" id="navigation-icon" className="inputDN" />
            <label for="navigation-icon">
              <p>محدودیت قیمت</p>
              <img src={navigationIcon} />
            </label>
            <ul className="sidebar-cat-content" />
          </li>
        </ul>
      </section>
    );
  }
}
export default Sidebar;
