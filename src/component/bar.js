import * as d3 from 'd3'
import data from './data'

class Bar {
  constructor(option) {
    this.option = option
  }

  draw () {
    const { barData } = data
    const { node } = this.option
    const margin = { top: 30, right: 0, bottom: 30, left: 40 }
    const height = 400
    const width = 600
    const color = '#61dafb'
    const sortBar = barData.sort((a, b) => d3.descending(a.value, b.value))


    const xScale = d3.scaleBand()
      .domain(d3.range(sortBar.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sortBar.map(item => item.value))])
      .range([height - margin.bottom, margin.top])


    const svg = d3.select(`#${node}`)
      .append('svg')
      .attr('viewBox', [0, 0, width, height])

    svg.append('g')
      .attr('fill', color)
      .selectAll('rect')
      .data(sortBar)
      .join('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d.value))
      .attr('height', d => yScale(0) - yScale(d.value))
      .attr('width', xScale.bandwidth())


    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(null, '%'))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", 'currentColor')
        .attr("text-anchor", "start")
        .text('↑ Frequency'))

    const xAxis = g => g
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(i => sortBar[i].name).tickSizeOuter(0))

    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)

  }

}

export default Bar