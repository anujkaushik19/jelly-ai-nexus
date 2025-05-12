
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import { PlusCircle, X, FileText, Edit, Trash } from "lucide-react";

interface EntitySet {
  id: string;
  name: string;
  entities: string[];
  createdAt: string;
}

// Mock data - would be replaced by Firebase in the real implementation
const mockEntitySets: EntitySet[] = [
  {
    id: "1",
    name: "Insurance Policy Details",
    entities: ["Policy Number", "Effective Date", "Expiration Date", "Premium", "Coverage Limit"],
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Client Information",
    entities: ["Full Name", "Email", "Phone", "Address", "Date of Birth"],
    createdAt: "2023-06-22T14:45:00Z",
  },
  {
    id: "3",
    name: "Claim Details",
    entities: ["Claim Number", "Date of Loss", "Type of Loss", "Amount Claimed", "Status"],
    createdAt: "2023-07-10T09:15:00Z",
  },
];

const EntitySets = () => {
  const [entitySets, setEntitySets] = useState<EntitySet[]>(mockEntitySets);
  const [newSetName, setNewSetName] = useState("");
  const [newEntity, setNewEntity] = useState("");
  const [entityArray, setEntityArray] = useState("");
  const [entitiesForNewSet, setEntitiesForNewSet] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSet, setEditingSet] = useState<EntitySet | null>(null);
  const { toast } = useToast();

  const handleAddEntity = () => {
    if (newEntity.trim() && !entitiesForNewSet.includes(newEntity.trim())) {
      setEntitiesForNewSet([...entitiesForNewSet, newEntity.trim()]);
      setNewEntity("");
    }
  };

  const handleAddEntityArray = () => {
    if (entityArray.trim()) {
      try {
        // Parse as JSON if it looks like an array
        if (entityArray.trim().startsWith("[") && entityArray.trim().endsWith("]")) {
          const parsedEntities = JSON.parse(entityArray);
          if (Array.isArray(parsedEntities)) {
            const validEntities = parsedEntities
              .filter(item => typeof item === "string" && item.trim())
              .map(item => item.trim());
            
            // Filter out duplicates with existing entities
            const uniqueEntities = validEntities.filter(
              entity => !entitiesForNewSet.includes(entity)
            );
            
            setEntitiesForNewSet([...entitiesForNewSet, ...uniqueEntities]);
            setEntityArray("");
            return;
          }
        }
        
        // If not JSON, treat as comma-separated values
        const splitEntities = entityArray
          .split(",")
          .map(item => item.trim())
          .filter(item => item && !entitiesForNewSet.includes(item));
        
        setEntitiesForNewSet([...entitiesForNewSet, ...splitEntities]);
        setEntityArray("");
      } catch (error) {
        toast({
          title: "Invalid format",
          description: "Please provide a valid JSON array or comma-separated list",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveEntity = (entityToRemove: string) => {
    setEntitiesForNewSet(entitiesForNewSet.filter(entity => entity !== entityToRemove));
  };

  const handleCreateEntitySet = () => {
    if (newSetName.trim() && entitiesForNewSet.length > 0) {
      if (editingSet) {
        // Update existing set
        const updatedSets = entitySets.map(set => 
          set.id === editingSet.id 
            ? { ...set, name: newSetName.trim(), entities: [...entitiesForNewSet] }
            : set
        );
        setEntitySets(updatedSets);
        setEditingSet(null);
        toast({
          title: "Entity Set Updated",
          description: `"${newSetName}" has been successfully updated with ${entitiesForNewSet.length} entities.`,
        });
      } else {
        // Create new set
        const newSet: EntitySet = {
          id: `id-${Date.now()}`,
          name: newSetName.trim(),
          entities: [...entitiesForNewSet],
          createdAt: new Date().toISOString(),
        };
        
        setEntitySets([newSet, ...entitySets]);
        toast({
          title: "Entity Set Created",
          description: `"${newSetName}" has been successfully created with ${entitiesForNewSet.length} entities.`,
        });
      }
      // Reset form
      setNewSetName("");
      setEntitiesForNewSet([]);
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Validation Error",
        description: "Please provide a name and at least one entity for the set.",
        variant: "destructive",
      });
    }
  };

  const handleEditEntitySet = (set: EntitySet) => {
    setEditingSet(set);
    setNewSetName(set.name);
    setEntitiesForNewSet([...set.entities]);
    setIsDialogOpen(true);
  };

  const handleDeleteEntitySet = (id: string) => {
    setEntitySets(entitySets.filter(set => set.id !== id));
    toast({
      title: "Entity Set Deleted",
      description: "The entity set has been removed.",
    });
  };

  const resetForm = () => {
    setNewSetName("");
    setEntitiesForNewSet([]);
    setEditingSet(null);
  };

  return (
    <div>
      <DashboardHeader title="Entity Sets" subtitle="Manage your document entity extraction sets" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Your Entity Sets</h2>
            <p className="text-gray-500 text-sm">Create and manage sets of entities for document extraction</p>
          </div>
          
          <Dialog 
            open={isDialogOpen} 
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-jelly-primary hover:bg-jelly-accent">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Entity Set
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingSet ? "Edit Entity Set" : "Create New Entity Set"}</DialogTitle>
                <DialogDescription>
                  {editingSet 
                    ? "Update your entity extraction set with the fields you want to extract from documents."
                    : "Define a group of entities that you want to extract from your documents."
                  }
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newSetName}
                    onChange={e => setNewSetName(e.target.value)}
                    placeholder="e.g., Insurance Policy Details"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="entity" className="text-right font-medium">
                    Add Entity
                  </Label>
                  <div className="col-span-3 flex gap-2">
                    <Input
                      id="entity"
                      value={newEntity}
                      onChange={e => setNewEntity(e.target.value)}
                      placeholder="e.g., Policy Number"
                      className="flex-1"
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddEntity();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="secondary"
                      onClick={handleAddEntity}
                      className="bg-jelly-secondary text-white hover:bg-jelly-accent"
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="entityArray" className="text-right font-medium">
                    Add Multiple
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <textarea
                      id="entityArray"
                      value={entityArray}
                      onChange={e => setEntityArray(e.target.value)}
                      placeholder='["Entity1", "Entity2", "Entity3"] or Entity1, Entity2, Entity3'
                      className="w-full min-h-[80px] px-3 py-2 text-sm rounded-md border border-input bg-background resize-none"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAddEntityArray}
                      className="border-jelly-primary text-jelly-primary hover:bg-jelly-primary/10"
                    >
                      Add Multiple
                    </Button>
                    <p className="text-xs text-gray-500">
                      Add multiple entities using JSON array or comma-separated values
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right font-medium">
                    Entities
                  </Label>
                  <div className="col-span-3">
                    {entitiesForNewSet.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">No entities added yet</p>
                    ) : (
                      <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-md bg-gray-50">
                        {entitiesForNewSet.map((entity, index) => (
                          <Badge key={index} variant="secondary" className="px-2 py-1 flex gap-1 items-center bg-white border border-gray-200">
                            {entity}
                            <button
                              type="button"
                              onClick={() => handleRemoveEntity(entity)}
                              className="hover:text-red-500 ml-1 focus:outline-none"
                            >
                              <X size={14} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateEntitySet} 
                  className="bg-jelly-primary hover:bg-jelly-accent"
                >
                  {editingSet ? "Update Entity Set" : "Create Entity Set"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entitySets.map(set => (
            <Card key={set.id} className="border border-gray-200 transition-shadow hover:shadow-md overflow-hidden">
              <CardHeader className="pb-3 bg-gray-50 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-jelly-primary">{set.name}</CardTitle>
                    <CardDescription>
                      {new Date(set.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteEntitySet(set.id)} 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {set.entities.map((entity, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 border-jelly-primary/30 bg-jelly-primary/5 text-jelly-primary">
                      {entity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4 bg-gray-50">
                <span className="text-sm text-gray-500">{set.entities.length} entities</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditEntitySet(set)}
                  className="border-jelly-primary text-jelly-primary hover:bg-jelly-primary/10"
                >
                  <Edit size={16} className="mr-2" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {entitySets.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-jelly-primary/10 flex items-center justify-center mb-4">
              <FileText className="text-jelly-primary" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Entity Sets Yet</h3>
            <p className="text-gray-500 mb-4">
              Create your first entity set to start extracting information from your documents.
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)} 
              className="bg-jelly-primary hover:bg-jelly-accent"
            >
              Create Your First Entity Set
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntitySets;
