import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// excell
import * as ExcelJS from "exceljs/dist/exceljs"
import { saveAs } from "file-saver";

const Info = () => {
    const navigate = useNavigate();
    const loc = useLocation();
    const od = loc.state.od;
    const totalP = loc.state.tp;
    const [info, setInfo] = useState({
        name: '',
        address: '',
    });
    // default set
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet(info.name + "의 주문서");

    // func
    const infoChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }
    const makeOrder = async () => {
        let order = [
            ['주문자 이름', info.name],
            ['배송지', info.address],
            ['주문정보', '상품명', '주문수량', '단가', '총액'],
        ];
        od.forEach(element => {
            order.push([' ', element.name, element.n, element.price, element.total])
        });
        order.push(['총 금액', totalP + '원'])

        ws.columns = [
            { header: "주문자 이름", key: "a", width: 30 },
            { header: info.name, key: "b", width: 8 },
            { header: "", key: "c", width: 10 },
            { header: "", key: "d", width: 10 },
            { header: "", key: "e", width: 10 },
        ];
        ws.addRow({ a: "배송지", b: info.address }).eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
        });
        ws.addRow({ a: "" })
        ws.addRow({ a: "주문 정보" }).eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
        });
        ws.addRow({ a: "상품명", b: "수량", c: '단가', d: "총액" }).eachCell((cell) => {
            cell.font = { bold: true }
            cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
        });
        od.forEach(element => {
            ws.addRow({
                a: element.name,
                b: element.n,
                c: parseInt(element.price),
                d: element.total
            }).eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
            });
        });
        ws.addRow({ a: "" })
        ws.addRow({ a: "총 금액", b: totalP }).eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
        });

        // 다운로드
        const mimeType = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], mimeType);
        saveAs(blob, info.name + "의주문서.xlsx");
    }
    return (<div id={"main-container2"}>
        <div>
            <input type={"button"} defaultValue={"뒤로가기"} onClick={() => {
                navigate('/')
            }}></input>
        </div>
        <table id="info-table" border={1}>
            <caption><h2>주문서</h2></caption>
            <tbody>
                <tr>
                    <th>주문자 이름</th>
                    <td><input placeholder={"이름을 입력해주세요"} name="name" onChange={infoChange}></input></td>
                </tr>
                <tr>
                    <th>배송지</th>
                    <td><input placeholder={"배송지를 입력해주세요"} name="address" onChange={infoChange}></input></td>
                </tr>
                <tr>
                    <th>주문 정보</th>
                    <td>
                        <table id="order-table" border={1}>
                            <thead>
                                <tr>
                                    <th>상품명</th>
                                    <th>주문 수량</th>
                                    <th>단가</th>
                                    <th>총 액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {od.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td key={item.name}>{item.name}</td>
                                            <td key={item.n + 1}>{item.n}</td>
                                            <td key={item.index + 1}>{item.price}원</td>
                                            <td key={item.total + 1}>{item.total}원</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <th>총 금액</th>
                    <td><input readOnly defaultValue={totalP + '원'}></input></td>
                </tr>
                <tr>
                    <th colSpan={2}>
                        <input type={"button"} defaultValue={"주문서 만들기"} onClick={makeOrder}></input>
                    </th>
                </tr>
            </tbody>
        </table>
    </div >)
}

export default Info;