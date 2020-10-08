const testingMode = true;
//LSPWare pricing table development
function insertTollTips() {
  const cells = document.querySelectorAll('td');
  // Dynamically creating tool tips for pricing table
  cells.forEach(function(cell) {
    const tip = document.createElement('div');
    tip.className = 'tool-tip';
    cell.appendChild(tip);

    const tipSection = cell.getAttribute('data-tipPosition');
    const tipData = cell.getAttribute('data-tipData');

    // Populating tool tip with data form content JS object embeddeded on page
    if (tipSection && tipData) {
      tip.textContent = toolTipData[tipSection][tipData]
    }
 //Position tool-tip above table cell
    const height = tip.offsetHeight;
    tip.style.top = (height * -1) + 'px';

    // event listener to close tip when clicked; primarily for mobile
    tip.addEventListener('click', function () {
      if (this.classList.contains('isVisible')) {
        this.style.visibility = 'hidden';
        this.classList.remove('isVisible');
      }
    });
  });
  // Remove empty tool tips that were created but never populated with content
  const tips = document.querySelectorAll('.tool-tip');
  tips.forEach(function(x) {
    if(x.textContent === '') {
      x.remove();
    } else if(x.parentElement) {
      x.parentElement.style.cursor = 'pointer';
    }
  })
//Hide table element wrapper so table is hidden on page load
  const showTable = document.querySelector('.lsp-price-table-options');
  showTable.style.display = 'none';
}

function showTips() {
  const showTip = document.querySelectorAll('.show-tip');

  showTip.forEach(function(x) {
    // Hide all open tips when a new one is opened
    x.addEventListener('click', function() {
      resetToolTips();
      if(this.nextElementSibling.classList.contains('isVisible')) {
        this.nextElementSibling.classList.remove('isVisible');
        this.nextElementSibling.style.visibility = 'hidden';
      } else {
        this.nextElementSibling.classList.add('isVisible');
        this.nextElementSibling.style.visibility = 'visible';
      }
    })
  })
}

// Hide all tooltips helper function
function resetToolTips() {
  const tips = document.querySelectorAll('.tool-tip');
  tips.forEach(function(d) {
    d.classList.remove('isVisible');
  })
}

const body = document.querySelector('body');

//Only build table on pricing page
if(testingMode && body.classList.contains('page-id-319')) {
  insertTollTips();
  showTips();
}

