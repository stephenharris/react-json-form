export default function conditionsCheck(conditional, object) { 

    return conditional.conditions.slice(0)
        .reduce((show, condition, i, conditions) => {
        
          var conditionPassed = comparison(condition.value, object[condition.target], condition.operator);

          if (conditionPassed ^ (conditional.gate == 'all')) {
            conditions.splice(1); 
          }

          return conditionPassed;

        }, true);

};

function comparison(value1, value2, operator) {

  switch(operator) {
    case 'eq':
    case '=':
    case 'equals':
      return value1 == value2;
      break;

    case 'neq':
    case '!=':
    case 'notequals':
      return value1 != value2;
      break;

    case 'lte':
    case '<=':
    case 'lessthanequal':
      return value1 <= value2;
      break;

    case 'lt':
    case '<':
    case 'lessthan':
      return value1 < value2;
      break;
    
    case 'gte':
    case '>=':
    case 'greaterthanequal':
      return value1 >= value2;
      break;
    
    case 'gt':
    case '>':
    case 'greaterthan':
      return value1 > value2;
      break;
    
    
  }

}