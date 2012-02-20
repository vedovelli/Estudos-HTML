
<div id="notification" class="alert-message.success">
	<p></p>
</div>

<p>&nbsp;</p>
<footer>&nbsp;</footer>

<!-- jquery -->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

<!-- js -->
{if $for=="product" or  $for=="employee" or  $for=="category"}
<script type="text/javascript" src="/view/js/twitter-bootstrap/bootstrap-modal.js"></script>
<script type="text/javascript" src="/view/js/Apprise-1.5.min/apprise-1.5.min.js"></script>
<script type="text/javascript" src="/view/js/jquery.json-2.3/jquery.json-2.3.min.js"></script>
<script type="text/javascript" src="/view/js/table-sorter/jquery.tablesorter.min.js"></script>
<script type="text/javascript" src="/view/js/table-filter/picnet.table.filter.min.js"></script>
{/if}

{if $for=="product"}
<script type="text/javascript" src="/view/js/product.js"></script>
{elseif $for=="employee"}
<script type="text/javascript" src="/view/js/employee.js"></script>
{elseif $for=="category"}
<script type="text/javascript" src="/view/js/category.js"></script>
{elseif $for=="help"}
<script type="text/javascript" src="/view/js/help.js"></script>
{/if}

<scrip type="text/javascript"t src="/view/js/app.js"></script>
<!-- end js -->

</body>
</html>