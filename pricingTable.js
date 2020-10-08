function PricingTable(testingMode, showTableOnLoad, bodyClass) {
  this.testingMode = testingMode;
  this.showTableonLoad = showTableOnLoad;
  this.bodyClass = bodyClass;

  this.buildToolTips = function() {
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
    });
//Hide table element wrapper so table is hidden on page load
    if(!this.showTableonLoad) {
      const showTable = document.querySelector('.lsp-price-table-options');
      showTable.style.display = 'none';
    }
  };

  this.toolTipsEventHandler = function() {
    const showTip = document.querySelectorAll('.show-tip');
    const self = this;

    showTip.forEach(function(x) {
        // Hide all open tips when a new one is opened
        x.addEventListener('click', function() {
          self.hideAllTips();
          if(this.nextElementSibling.classList.contains('isVisible')) {
            this.nextElementSibling.classList.remove('isVisible');
            this.nextElementSibling.style.visibility = 'hidden';
          } else {
            this.nextElementSibling.classList.add('isVisible');
            this.nextElementSibling.style.visibility = 'visible';
          }
        });
      });
  };

  this.hideAllTips = function() {
    const tips = document.querySelectorAll('.tool-tip');

    tips.forEach(function(d) {
      d.classList.remove('isVisible');
      d.style.visibility = 'hidden';
    })
  };

  this.hideRedX = function() {
    let tableData = document.querySelectorAll('.page-id-319 table td.red');
    tableData.forEach(function(t) {
      t.textContent = "";
    })
  };

  this.comparePlansEvent = function() {
    const comparePlans = document.querySelector('.compare-plans');
    const bttnText = document.querySelector('.compare-plans .button-text');
    const tableWrap = document.querySelector('.lsp-price-table-options');

    comparePlans.addEventListener('click', function(e) {
      e.preventDefault();
      if(tableWrap.style.display === 'block') {
        bttnText.textContent = "Compare Plans";
        tableWrap.style.display = 'none';
      } else {
        bttnText.textContent = "Hide Plans";
        tableWrap.style.display = 'block';
      }
    })
  };

  this.initTableProduction = function() {
    console.log('inited')
    const body = document.querySelector('body');
    if(body.classList.contains(this.bodyClass)) {
      this.buildToolTips();
      this.toolTipsEventHandler();
      this.hideAllTips();
      this.hideRedX();
      this.comparePlansEvent();
    }
  };

  this.initTableTestMode = function() {
    console.log('inited test')
    this.buildToolTips();
    this.toolTipsEventHandler();
    this.hideAllTips();
    this.hideRedX();
  }

}

const LSPWarePricingTable = new PricingTable(true, true, 'page-id-319' );

(function() {
  if(LSPWarePricingTable.testingMode) {
    LSPWarePricingTable.initTableTestMode();
  } else {
    LSPWarePricingTable.initTableProduction();
  }
})();
