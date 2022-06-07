import hljs from "highlight.js";
import { InforiverChart } from "@visualbi/inforiver-charts";
import { toggleContainer } from "../../assets/scripts/router";
import dataRows from "../datasets/simple";
import { groupBy } from "../utils";

const getWaterfallChart = () => {
  toggleContainer(true);
  const pageTitle = document.getElementById("page-title");
  pageTitle.textContent = "Waterfall Chart";
  const codeOptions = document.getElementById("code-options");
  const optionsValue = hljs.highlight(
    `
        const options = {
            container: '<HTML Element>',
            chartOptions: {
                chartType: 'waterfallChart'
            },
            datasource: {
                metadata: {
                    row: "Country",
                    measures: ["Sales"],
                },
                dataRows: '<Datrows>',
            }
        }
    `,
    { language: "javascript" }
  );
  // codeOptions.innerHTML = optionsValue.value;
  const visualDOM = document.getElementById("visual-render-area");
  const waterfallChart = new InforiverChart({
    container: visualDOM,
    chartOptions: {
      chartType: "waterfallChart",
    },
    datasource: {
      metadata: {
        row: ["Country"],
        measures: ["Sales", "Profit"],
        measureMeta: {
          AC: ["Profit"],
          PY: "Sales",
        },
      },

      dataRows,
    },
    feature: {
      toolbar: {
        exportAsPDF: true,
      },
    },
  });
  waterfallChart.render();
};

export default getWaterfallChart;
