import React, {useEffect, useState} from "react";
// @ts-ignore
import Graph from "react-graph-vis"
// @ts-ignore
import {generateEdgesForNetworkGraph, generateNodesForNetworkGraph} from "./NetworkGraphLogic";
import {getServersByUser} from "../packet-per-ip-graph-sp/PacketPerIPSPLogic";
import {getNumPacketsSentAndReceivedClient} from "../packet-per-ip-graph-client/PacketPerIPClientLogic";


export default function NetworkGraph() {
    const [nodes, setNodes] = useState([] as { id: number; label: string; color: string}[])
    const [edges, setEdges] = useState([] as { to: number; from: number }[])

    let nodeList: { id: number; label: string; color: string}[]
    let edgeList: { from: number; to: number }[];
    let userInfo: string[]; // user info

    useEffect(() => {
        const getData = async () => {

            const email = localStorage.getItem("email")!.substring(1, localStorage.getItem("email")!.length - 1);
            userInfo = await getServersByUser(email);
            nodeList = await  generateNodesForNetworkGraph(userInfo);
            setNodes(nodeList)
            edgeList = await generateEdgesForNetworkGraph(nodeList, userInfo.length);
            setEdges(edgeList)

        }
        getData()
    }, [])



    const renderNetGraph = (nodeList: { id: number; label: string; color: string}[], edgeList: { to: number; from: number }[]) => {
        const graph = {
            nodes: nodeList,
            edges: edgeList
        };

        const options = {
            nodes: {
                shape: "dot",
                size: 30,
                font: {
                    size: 32,
                },
                borderWidth: 2,
                shadow: true,
                color: "#94579E"
            },
            edges: {
                width: 2,
                shadow: true,
                color: "#24272C",
                arrows: {
                    to: {
                        enabled: false,
                    }
                }
            },
            physics: {
                enabled: true,
                // enabled: false,
                // solver: "repulsion",
                // repulsion: {
                //     nodeDistance:100 // Put more distance between the nodes.
                // },
                // stabilization: {
                //     enabled: true,
                //     iterations: 5000    // YMMV
                // },
                barnesHut: {
                    "springConstant": 0,
                    "avoidOverlap": 0.2
                }
            },
            layout: {
                hierarchical: false
            },
            height: "500px",
            width: "1340px"
        };

        const events = {
            select: function ({event}: { event: any }) {
                const {nodes, edges} = event;
            }
        };

        return <Graph graph={graph} options={options} events={events}></Graph>

    }

    return (
        <div >
            {renderNetGraph(nodes, edges)}
        </div>
    );
}