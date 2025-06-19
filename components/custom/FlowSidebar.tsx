import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"
import { Cuboid, PanelLeftIcon, Plus } from "lucide-react"
import { useNodeDetails } from "@/contexts/NodeDetailsContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { createNewNodeAndEdge } from "./handles/utils/nodeCreation";

interface FlowSidebarTypes {
  onAddNode?: (newNode: any, newEdge: any) => void;
}

export function FlowSidebar({ onAddNode }: FlowSidebarTypes) {
    const { nodeDetails } = useNodeDetails();
    console.log("🔍 ~ FlowSidebar ~ components/custom/FlowSidebar.tsx:20 ~ nodeDetails:", nodeDetails)
    const { open, setOpen } = useSidebar();
    
    const handleAddNode = useCallback((type: string) => {
        if (onAddNode && nodeDetails.nodeId) {
            const { newNode, newEdge } = createNewNodeAndEdge(nodeDetails.nodeId, nodeDetails.handleId, nodeDetails.positionX, nodeDetails.positionY)
            onAddNode(newNode, newEdge)
            // Here you would create a new node based on the selected type
            // For now, we'll just log the details
            console.log(`Adding ${type} node connected to ${nodeDetails.nodeId} at position (${nodeDetails.positionX}, ${nodeDetails.positionY})`);
            
            // Close the sidebar after adding
            setOpen(false);
        }
    }, [nodeDetails, onAddNode, setOpen]);

    return (

        <Sidebar
            side="right"
            variant="sidebar"
            className="rounded-none border-black text-white"
        >
            <SidebarContent className="bg-gray-900 rounded-none">
                
                <SidebarGroup className="p-4 space-y-2">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">SELECT NODE TYPE</h3>
                    
                    <SidebarMenuItem 
                        className={`flex flex-row items-center gap-3 hover:bg-gray-800 p-3 rounded-md transition-colors ${nodeDetails.nodeId ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                        onClick={() => nodeDetails.nodeId && handleAddNode('regular')}
                    >
                        <Cuboid className="text-white" size={18} />
                        <span className="text-base">Regular Block</span>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem 
                        className={`flex flex-row items-center gap-3 hover:bg-gray-800 p-3 rounded-md transition-colors ${nodeDetails.nodeId ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                        onClick={() => nodeDetails.nodeId && handleAddNode('panel')}
                    >
                        <PanelLeftIcon className="text-white" size={18} />
                        <span className="text-base">Panel Block</span>
                    </SidebarMenuItem>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}