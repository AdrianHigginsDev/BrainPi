module.exports = function (Route) {



Route.Get('/testingCsv', 'SalesTransactionsController@csvTest');

Route.Post('/postMysql', 'SalesTransactionsController@mysqlTest');

// Uri.Input();


}