module.exports = function (Uri) {



Uri.Output('/testingCsv', 'SalesTransactions@csvTest');

Uri.Output('/testingMySql', 'SalesTransactions@mysqlTest');

Uri.Input('/postMysql', 'SalesTransactionsInput@mysqlTest');

// Uri.Input();


}