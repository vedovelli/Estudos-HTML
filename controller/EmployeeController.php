<?php

require_once 'model/Employee.php';

class EmployeeController {
	
	public function employeeList()
	{
		//$options = array('limit' => 50);
		$employees = Employee::all( /*$options*/ );
		$return = array();
		
		foreach ($employees as $employee)
		{
			$e = array();
			$e['id'] = $employee->id;
			$e['nome'] = $employee->nome;
			$e['email'] = $employee->email;
			$e['usuario'] = $employee->usuario;
			
			$return[] = $e;
		}

		return $return;
		
	}
	
	public function getEmployee( $employeeid )
	{
		$employee = Employee::find( $employeeid );
		$e = array();
		$e ['id'] = $employee->id;
		$e ['nome'] = $employee->nome;
		$e ['email'] = $employee->email;
		$e ['usuario'] = $employee->usuario;
		return json_encode( $e );
	}
	
	public function saveEmployee( $employee )
	{
		
		$e = array();
		
		if( $employee['id'] > 0 )
		{
			$model = Employee::find( $employee['id'] );
			$model->nome = $employee['nome'];
			$model->email = $employee['email'];
			$model->usuario = $employee['usuario'];
			if( $employee['senha'] !="" ) $model->senha = $employee['senha'];
			$model->save();
			$e['status'] = 'upd';
		} else {
			$model = Employee::create( $employee );
			$e['status'] = 'add';
			$e['id'] = $model->id;
		}
		
		$e['nome'] = $model->nome;
		$e['email'] = $model->email;
		$e['usuario'] = $model->usuario;
		
		return json_encode($e);
		
	}
	
	public function removeEmployee( $employeeid )
	{
		$employee = Employee::find( $employeeid );
		return $employee->delete();
	}
	
	
}

?>