import * as d3 from 'd3'
import data from './data'

class Line {
  constructor(option) {
    this.option = option
  }

  draw () {
    const { lineData } = data
    const { node } = this.option
    const margin = { top: 30, right: 0, bottom: 30, left: 40 }
    const height = 400
    const width = 600
    const color = '#61dafb'

    console.log(d3.extent(lineData, d => d.date))
    const xScale = d3.scaleTime()
      .domain(["2007-05-01", "2007-05-30"])
      .range([margin.left, width - margin.right])

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(lineData.map(item => item.value))])
      .nice()
      .range([height - margin.bottom, margin.top])

    const line = d3.line()
      .defined(d => !isNaN(d.value))
      .x(d => {
        console.log(xScale(d.date), d)
        return xScale(d.date)
      })
      .y(d => {
        console.log(yScale(d.value), 'yScale(d.value)')
        return yScale(d.value)
      })


    const svg = d3.select(`#${node}`)
      .append('svg')
      .attr('viewBox', [0, 0, width, height])

    svg.append('path')
      .datum(lineData)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('$-close')
      )

    const xAxis = g => g
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0))

    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)

  }

}

export default Line