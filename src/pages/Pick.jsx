import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as ExcelJS from "exceljs"
import { saveAs } from "file-saver";
// products imgs
import extra from "../product_imgs/products/avoE.png";
import pure from "../product_imgs/products/avoP.png";
import oliv from "../product_imgs/products/oliv.png";
import charm from "../product_imgs/products/charm.png";
import itali from "../product_imgs/products/itali.png";
import pinksalt from "../product_imgs/products/pinksalt.png";
import pasta from "../product_imgs/products/pasta.png";

const Pick = () => {
    const [productL] = useState([
        {
            name: "아보카도오일 엑스트라 버진",
            gram: "250ml",
            countryOforigin: "멕시코",
            price: "8000",
        },
        {
            name: "아보카도오일 퓨어",
            gram: "250ml",
            countryOforigin: "멕시코",
            price: "7000",
        },
        {
            name: "올리브 오일 포마스",
            gram: "250ml",
            countryOforigin: "스페인",
            price: "4000",
        },
        {
            name: "발사믹 식초",
            gram: "250ml",
            countryOforigin: "이탈리아",
            price: "4000",
        },
        {
            name: "참기름",
            gram: "250ml",
            countryOforigin: "외국산",
            price: "6000",
        },
        {
            name: "히말라야 핑크솔트",
            gram: "150g",
            countryOforigin: "파키스탄",
            price: "3500",
        },
        {
            name: "비스 파스타면",
            gram: "500g",
            countryOforigin: "이탈리아",
            price: "2500",
        },
    ]);
    const [num, setNum] = useState({
        ex_num: 0,
        pu_num: 0,
        ol_num: 0,
        ba_num: 0,
        ch_num: 0,
        sa_num: 0,
        pa_num: 0,
    });
    const numChanger = (e) => {
        let val = 0;
        if (isNaN(e.target.value)) {
            val = 0;
        } else {
            val = parseInt(e.target.value);
        }
        setNum({
            ...num,
            [e.target.name]: val,
        });
    };
    const UP = (id) => {
        let item = document.getElementById(id);
        item.value = parseInt(item.value) + 1;
        setNum({
            ...num,
            [id]: parseInt(item.value),
        });
    };
    const DOWN = (id) => {
        let item = document.getElementById(id);
        if (item.value > 0) {
            item.value = parseInt(item.value) - 1;
            setNum({ ...num, [id]: parseInt(item.value) });
        }
    };
    const navigate = useNavigate();
    const subMit = async () => {
        let arr = [];
        let j = 0;
        let totalP = 0;
        for (let i in num) {
            if (num[i] !== 0) {
                arr.push({
                    name: productL[j].name,
                    n: num[i],
                    price: productL[j].price,
                    total: parseInt(productL[j].price) * parseInt(num[i])
                });
                totalP += parseInt(productL[j].price) * parseInt(num[i]);
                j++;
            }
            else {
                j++;
                continue;
            }
        }
        await navigate('/info', { state: { od: arr, tp: totalP } });
    }
    return (
        <div id="main-container1" >
            <table id="products" border={1}>
                <caption id="title">
                    <h3>제품 목록</h3>
                </caption>
                <tbody>
                    <tr>
                        <th>{"품명"}</th>
                        {productL.map((item) => {
                            return <td key={item.name}>{item.name}</td>;
                        })}
                    </tr>
                    <tr>
                        <th>{"상품 사진"}</th>
                        <td>
                            <img
                                className={"product"}
                                src={extra}
                                alt={"엑스트라버진"}
                            ></img>
                        </td>
                        <td>
                            <img
                                className={"product"}
                                src={pure}
                                alt={"퓨어"}
                            ></img>
                        </td>
                        <td>
                            <img
                                className={"product"}
                                src={oliv}
                                alt={"올리브"}
                            ></img>
                        </td>
                        <td>
                            <img
                                className={"product"}
                                src={itali}
                                alt={"발사믹"}
                            ></img>
                        </td>
                        <td>
                            <img
                                className={"product"}
                                src={charm}
                                alt={"참기름"}
                            ></img>
                        </td>
                        <td>
                            <img
                                className={"product"}
                                src={pinksalt}
                                alt={"핑크솔트"}
                            ></img>
                        </td>
                        <td>
                            <img
                                className={"product"}
                                src={pasta}
                                alt={"파스타면"}
                            ></img>
                        </td>
                    </tr>
                    <tr>
                        <th>{"용량"}</th>
                        {productL.map((item) => {
                            return <td key={item.name}>{item.gram}</td>;
                        })}
                    </tr>
                    <tr>
                        <th>{"원산지"}</th>
                        {productL.map((item) => {
                            return (
                                <td key={item.name}>{item.countryOforigin}</td>
                            );
                        })}
                    </tr>
                    <tr>
                        <th>{"가격"}</th>
                        {productL.map((item) => {
                            return <td key={item.name}>{item.price}원</td>;
                        })}
                    </tr>
                    <tr>
                        <th>{"주문 수량"}</th>
                        <td>
                            <div className={"btn_con"}>
                                <button
                                    onClick={() => {
                                        UP("ex_num");
                                    }}
                                >
                                    {"🔺"}
                                </button>
                                <input
                                    id="ex_num"
                                    name="ex_num"
                                    defaultValue={num.ex_num}
                                    onChange={numChanger}
                                ></input>
                                <button
                                    onClick={() => {
                                        DOWN("ex_num");
                                    }}
                                >
                                    {"🔻"}
                                </button>
                            </div>
                        </td>
                        <td>
                            <div className={"btn_con"}>
                                <button onClick={() => {
                                    UP("pu_num");
                                }}>{"🔺"}</button>
                                <input
                                    id="pu_num"
                                    name="pu_num"
                                    defaultValue={num.pu_num}
                                    onChange={numChanger}
                                ></input>
                                <button onClick={() => {
                                    DOWN("pu_num");
                                }}>{"🔻"}</button>
                            </div>
                        </td>
                        <td>
                            <div className={"btn_con"}>
                                <button onClick={() => {
                                    UP("ol_num");
                                }}>{"🔺"}</button>
                                <input
                                    id="ol_num"
                                    name="ol_num"
                                    defaultValue={num.ol_num}
                                    onChange={numChanger}
                                ></input>
                                <button onClick={() => {
                                    DOWN("ol_num");
                                }}>{"🔻"}</button>
                            </div>
                        </td>
                        <td>
                            <div className={"btn_con"}>
                                <button onClick={() => {
                                    UP("ba_num");
                                }}>{"🔺"}</button>
                                <input
                                    id="ba_num"
                                    name="ba_num"
                                    defaultValue={num.ba_num}
                                    onChange={numChanger}
                                ></input>
                                <button onClick={() => {
                                    DOWN("ba_num");
                                }}>{"🔻"}</button>
                            </div>
                        </td>
                        <td>
                            <div className={"btn_con"}>
                                <button onClick={() => {
                                    UP("ch_num");
                                }}>{"🔺"}</button>
                                <input
                                    id="ch_num"
                                    name="ch_num"
                                    defaultValue={num.ch_num}
                                    onChange={numChanger}
                                ></input>
                                <button onClick={() => {
                                    DOWN("ch_num");
                                }}>{"🔻"}</button>
                            </div>
                        </td>
                        <td>
                            <div className={"btn_con"}>
                                <button onClick={() => {
                                    UP("sa_num");
                                }}>{"🔺"}</button>
                                <input
                                    id="sa_num"
                                    name="sa_num"
                                    defaultValue={num.sa_num}
                                    onChange={numChanger}
                                ></input>
                                <button onClick={() => {
                                    DOWN("sa_num");
                                }}>{"🔻"}</button>
                            </div>
                        </td>
                        <td>
                            <div className={"btn_con"}>
                                <button onClick={() => {
                                    UP("pa_num");
                                }}>{"🔺"}</button>
                                <input
                                    id="pa_num"
                                    name="pa_num"
                                    defaultValue={num.pa_num}
                                    onChange={numChanger}
                                ></input>
                                <button onClick={() => {
                                    DOWN("pa_num");
                                }}>{"🔻"}</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={subMit}>{"다음"}</button>
        </div >
    );
}

export default Pick;
