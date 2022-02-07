import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparents",
            },
            stroke: {
              curve: "smooth",
            },
            grid: {
              show: false,
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              categories: data?.map((price) => price.time_close),
              type: "datetime",
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 80] },
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
              theme: "dark",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
