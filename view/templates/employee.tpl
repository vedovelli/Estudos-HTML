{include file="partial_header.tpl"}

{include file="partial_menu.tpl"}

<div class="container">
	
	<div class="page-header">
		<h2>
			<img alt="Icon Colaboradores" src="/view/img/users.png"/>
			Gerenciamento de Colaboradores
			<a href="#" id="btn-novo" class="btn primary" data-controls-modal="popup_employee" data-backdrop="true" 
			data-keyboard="true">Novo Colaborador</a>
		</h2>
	</div>
	
	<table id="employee_list_table" class="zebra-striped">
		<thead>
			<tr>
				<th>ID</th>
				<th>Nome</th>
				<th>E-mail</th>
				<th>Colaborador</th>
				<th width="40"></th>
				<th width="40"></th>
			</tr>
		</thead>
		<tbody>
		{foreach from=$employees item=employee}
			{$id=$employee['id']}
			{$nome=$employee['nome']}
			{$email=$employee['email']}
			{$usuario=$employee['usuario']}
			<tr style="background-color:#e2e2e2">
				<td>{$id}</td>
				<td>{$nome}</td>
				<td>{$email}</td>
				<td>{$usuario}</td>
				<td><input type="button" value="Editar" class="btn success btn_editar" data-id="{$id}" data-controls-modal="popup_employee" data-backdrop="true" data-keyboard="true" title="Clique para EDITAR {$nome} [id: {$id}]"></td>
				<td><input type="button" value="Excluir" class="btn danger btn_excluir" data-id="{$id}" title="Clique para EXCLUIR {$nome} [id: {$id}]"></td>
			</tr>
		{/foreach}
		</tbody>
	</table>
	
	<!-- form employee -->
	<div id="popup_employee" class="modal hide fade">
		<div class="modal-header">
			<a href="#" class="close">&times;</a>
			<h3>Adicione ou atualize um colaborador</h3>
		</div>
		<div class="modal-body">
			
			<form id="form_employee" name="form_employee" class="form-stacked">
	
				<input type="hidden" name="id" id="employee_id">
				
				
				<div class="row">
				
					<div class="span6">
					
						<div class="clearfix">
							<label for="employee_nome">Nome</label>
							<div class="input">
								<input class="xlarge" id="employee_nome" name="nome" size="30" type="text" />
				            </div>
						</div>
					
						<div class="clearfix">
							<label for="employee_email">E-mail</label>
							<div class="input">
								<input class="xlarge" id="employee_email" name="email" size="30" type="text" />
				            </div>
						</div>
					
					</div>				
				
					<div class="span6">
					
						<div class="clearfix">
							<label for="employee_usuario">Usu&aacute;rio</label>
							<div class="input">
								<input class="xlarge" id="employee_usuario" name="usuario" size="30" type="text" />
				            </div>
						</div>
					
						<div class="clearfix">
							<label for="employee_senha">Senha</label>
							<div class="input">
								<input class="xlarge" id="employee_senha" name="senha" size="30" type="password" />
				            </div>
						</div>
						
					</div>
									
				</div>
				
			</form>
			
		</div>
		<div class="modal-footer">
			<input type="button" id="submit_button" class="btn primary" value="Salvar"/>
		</div>
	</div>
          
          
	
</div>

{include file="partial_footer.tpl" for="employee"}