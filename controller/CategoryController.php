<?php

require_once 'model/Category.php';

class CategoryController {
	
	public function categoryList( $output = "" )
	{
		//$options = array('limit' => 50);
		$categories = Category::all( /*$options*/ );
		$return = array();
		
		foreach ($categories as $category)
		{
			$c = array();
			$c['id'] = $category->id;
			$c['category'] = $category->category;
			
			$return[] = $c;
		}

		if( $output == 'json' )
		{
			return json_encode($return);			
		} else {
			return $return;
		}
		
	}
	
	public function getCategory( $categoryid )
	{
		$category = Category::find( $categoryid );
		$c = array();
		$c['id'] = $category->id;
		$c['category'] = $category->category;
		return json_encode( $c );
	}
	
	public function saveCategory( $category )
	{
		$c = array();
		
		if( $category['id'] > 0 )
		{
			$model = Category::find( $category['id'] );
			$model->category = $category['category'];
			$model->save();
			$c['status'] = 'upd';
		} else {
			$model = Category::create( $category );
			$c['status'] = 'add';
		}
		
		$c['id'] = $model->id;
		$c['category'] = $model->category;
		
		return json_encode($c);
		
	}
	
	public function removeCategory( $categoryid )
	{
		$category = Category::find( $categoryid );
		return $category->delete();
	}
	
	
}

?>