export const buildGraph = (input) => {
  if(!input) return
  const graph = { nodes: [], links: [] }
  const splitedInput = input.split(',')
  for (let string of splitedInput) {
    const nodes = string.replaceAll(' ', '').split('-')
    nodes.forEach((node, index) => {
      if (index !== nodes.length - 1)
        graph.links.push({ source: node, target: nodes[index + 1] })
      if (graph.nodes.find(sn => sn.id === node)) return;
      graph.nodes.push({ id: node })
    })
  }
  return graph
}



const transform = (input) => {
  const graph = {}
  const splitedInput = input.split(',')
  for (let string of splitedInput) {
    const nodes = string.replaceAll(' ','').split('-')
    nodes.forEach((node, index) => {
      if (!(node in graph)) graph[node] = []
      if (index !== nodes.length - 1)
        graph[node].push(nodes[index + 1])
      if (index !== 0)
        graph[node].push(nodes[index - 1])
    })
  }
  return graph
}

export const connectedAndColored = (input) => {
  if(!input) return {}
  const visited = new Set()
  const graph = transform(input)

  let count = 0
  let connected = false
  let colorable = false

  const firstNode = Object.keys(graph)[0]
  const colorObj = {}
  colorObj[firstNode] = true

  for (let node in graph) {
    if (explore(node, graph, visited, colorObj))
      count += 1
  }
  if (count === 1) {
    connected = true
    colorable = isColorable(colorObj, graph)
  }
  return { connected, colorable }
};

const isColorable = (colorObj, graph) => {
  for (let node in graph) {
    for (let neighbor of graph[node]) {
      if (colorObj[neighbor] === colorObj[node])
        return false
    }
  }
  return true
}

const explore = (node, graph, visited, colorObj) => {
  if (visited.has(String(node)))
    return false
  visited.add(String(node))
  for (let neighbor of graph[node]) {
    if (!(neighbor in colorObj))
      colorObj[neighbor] = !colorObj[node]
    explore(neighbor, graph, visited, colorObj)
  }
  return true
}
