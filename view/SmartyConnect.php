<?php
require_once 'smarty/libs/Smarty.class.php';

class SmartyConnect extends Smarty{

   function SmartyConnect(){

   		parent::__construct();

		$this->caching = false;
		//$this->debugging = true;		

		$this->template_dir		= dirname(__FILE__)."/templates";
		$this->config_dir		= dirname(__FILE__)."/config";
		$this->cache_dir		= dirname(__FILE__)."/cache";
		$this->compile_dir		= dirname(__FILE__)."/templates_c";
		
   }

}
?>