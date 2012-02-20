<?php

require_once 'model/Product.php';
require_once 'model/Category.php';

class ProductController {
	
	private function getCategoryName( $category_id )
	{
		$category = Category::find( $category_id );
		if( $category != NULL )
		{
			return $category->category;
		} else {
			return "";
		}
	}
	
	public function productList()
	{
		//$options = array('limit' => 50);
		$products = Product::all( /*$options*/ );
		$return = array();
		
		foreach ($products as $product)
		{
			$p = array();
			$p['id'] = $product->id;
			$p['title'] = $product->title;
			$p['google_id'] = $product->google_id;
			$p['category_id'] = $product->category_id;
			$p['category'] = $this->getCategoryName($product->category_id);
			
			$return[] = $p;
		}

		return $return;
		
	}
	
	public function getProduct( $productid )
	{
		$product = Product::find( $productid );
		$p = array();
		$p['id'] = $product->id;
		$p['title'] = $product->title;
		$p['google_id'] = $product->google_id;
		$p['category_id'] = $product->category_id;
		$p['category'] = $this->getCategoryName($product->category_id);
		return json_encode( $p );
	}
	
	public function saveProduct( $product )
	{
		$p = array();
		
		if( $product['id'] > 0 )
		{
			$model = Product::find( $product['id'] );
			$model->title = $product['title'];
			$model->google_id = $product['google_id'];
			$model->category_id = $product['category_id'];
			$model->save();
			$p['status'] = 'upd';
		} else {
			$model = Product::create( $product );
			$p['status'] = 'add';
		}
		
		$p['id'] = $model->id;
		$p['title'] = $model->title;
		$p['google_id'] = $model->google_id;
		$p['category_id'] = $model->category_id;
		$p['category'] = $this->getCategoryName($model->category_id);
		
		return json_encode($p);
		
	}
	
	public function removeProduct( $productid )
	{
		$product = Product::find( $productid );
		return $product->delete();
	}
	
	
}

?>