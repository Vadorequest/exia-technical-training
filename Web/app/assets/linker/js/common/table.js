/**
 * Helper that will automatically apply some style to all tables.
 *
 * See http://getbootstrap.com/css/#tables
 */
$(function(){
  // Add bootstrap table styles requirements.
  // This solution is temporary and not perfect (latency of the design), but it's until we add the required classes to all tables manually.
  $('table .datatable').addClass('table table-striped table-hover');
});