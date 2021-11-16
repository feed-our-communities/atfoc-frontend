import React from 'react';
import { useTable } from 'react-table'

/**
 * @returns join requests view
 */
 export default function JoinRequests() {

    let pendingJoinRequests = await getPendingJoinRequests();

    //TODO set columns and data

    return (<>
                <h1>Join Requests</h1>
                <Table columns={columns} data={data} />
            </>);

 }

/**
 * Original table structure retrieved from: https://codesandbox.io/s/ewm82?file=/src/App.js:893-1152
 * 
 */
 function Table({ columns, data }) {

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

    return (
        <>
            <table {...getTableProps()}>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );

 }

 async function getPendingJoinRequests() {

    const pendingStatusNum = 0;

    let result = await callJoinRequestsAPI(pendingStatusNum);

    return result;
 }

 async function callJoinRequestsAPI(status) {
    //TODO get token and orgID

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token" + token);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/joinrequests/?organization=" + orgID + "&status=" + status, requestOptions);
    let result = await response.json();

    if (response.status === 200 || response.status === 204) {
        return result;
    } else {
        console.log(result);
    }

    return [];
 }
