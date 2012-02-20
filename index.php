<?php

set_include_path( implode(PATH_SEPARATOR, array( realpath(dirname(__FILE__) . '/library'), 	get_include_path() ) ) );

require_once 'Slim/Slim.php';
require_once 'view/SmartyConnect.php';
require_once 'controller/CategoryController.php';
require_once 'controller/EmployeeController.php';
require_once 'controller/ProductController.php';

$app = new Slim();
$smarty = new SmartyConnect();
$productController = new ProductController();
$categoryController = new CategoryController();
$colaboradoresController = new EmployeeController();

#MOBILE
$app->get('/m', function() use ( $smarty ){

	$smarty->display( "mobile.tpl" );

});


#INDEX
$app->get('/', function() use ( $smarty ){

	$smarty->display( "index.tpl" );

});



#DASHBOARD
$app->get('/dashboard', function() use ( $smarty ){
	
	$smarty->display( "dashboard.tpl" );
	 
});



#AJUDA
$app->get('/ajuda', function() use ( $smarty ){

	$smarty->display( "help.tpl" );
	 
});



#COLABORADORES
$app->get('/colaboradores', function() use ( $smarty, $colaboradoresController ){

	$smarty->assign( "employees", $colaboradoresController->employeeList() );
	$smarty->display( "employee.tpl" );
	
});

$app->get('/colaboradores/:id', function( $id ) use ( $app, $colaboradoresController ){
	
	if( $app->request()->isAJAX() )
	{
		echo $colaboradoresController->getEmployee( $id );
		
	} else {
		
		header('Location:/colaboradores');
		exit;
		
	}
	
});

$app->post('/colaboradores', function() use ( $app, $colaboradoresController ){

	$data = $app->request()->post();
	echo $colaboradoresController->saveEmployee( $data );
	
});

$app->put('/colaboradores', function() use ( $app, $colaboradoresController ){
	
	$data = $app->request()->put();
	echo $colaboradoresController->saveEmployee( $data );
	
});

$app->delete('/colaboradores/:id', function( $id ) use ( $app, $colaboradoresController ){
	
	//$app->response()->status( 204 );
	echo $colaboradoresController->removeEmployee( $id );
	
});



#CATEGORIAS
$app->get('/categorias', function() use ( $smarty, $categoryController ){

	$smarty->assign( "categories", $categoryController->categoryList() ); 
	$smarty->display( "category.tpl" );
	
});

$app->get('/categorias_json', function() use ( $categoryController ){

	echo $categoryController->categoryList( 'json' );
	
});

$app->get('/categorias/:id', function( $id ) use ( $app, $categoryController ){
	
	if( $app->request()->isAJAX() )
	{
		echo $categoryController->getCategory( $id );
		
	} else {
		
		header('Location:/categorias');
		exit;
		
	}
	
});

$app->post('/categorias', function() use ( $app, $categoryController ){
	
	$data = $app->request()->post();
	echo $categoryController->saveCategory( $data );
	
});

$app->put('/categorias', function() use ( $app, $categoryController ){
	
	$data = $app->request()->put();
	echo $categoryController->saveCategory( $data );
	
});

$app->delete('/categorias/:id', function( $id ) use ( $app, $categoryController ){
	
	//$app->response()->status( 204 );
	echo $categoryController->removeCategory( $id );
	
});



#PRODUTOS
$app->get('/produtos', function() use ( $smarty, $productController ){
	
	$smarty->assign( "products", $productController->productList() ); 
	$smarty->display( "product.tpl" );
	
});

$app->get('/produtos/:id', function( $id ) use ( $smarty, $app, $productController ){
	
	if( $app->request()->isAJAX() )
	{
		echo $productController->getProduct( $id );
		
	} else {
		
		header('Location:/produtos');
		exit;
		
	}
	
});

$app->post('/produtos', function() use ( $app, $productController ){
	
	$data = $app->request()->post();
	echo $productController->saveProduct( $data );
	
});

$app->put('/produtos', function() use ( $app, $productController ){
	
	$data = $app->request()->put();
	echo $productController->saveProduct( $data );
	
});

$app->delete('/produtos/:id', function( $id ) use ( $app, $productController ){
	
	//$app->response()->status( 204 );
	echo $productController->removeProduct( $id );
	
});



#Run
$app->run();