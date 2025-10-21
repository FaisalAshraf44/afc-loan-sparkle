import { Card } from "@/components/ui/card";

const Overview = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <Card className="p-6">
        <p className="text-muted-foreground">
          This is a placeholder page. Navigate using the sidebar to access different sections.
        </p>
      </Card>
    </div>
  );
};

export default Overview;
