import ImpactAnnex from "@/components/ImpactAnnex";

const ImpactAnnexPage = () => {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Impact Annex
        </h1>
        <p className="text-muted-foreground">
          This appears within the ID Memo, EIM, FIM and BRIC screens.
        </p>
      </div>

      <ImpactAnnex variant="final" />
    </div>
  );
};

export default ImpactAnnexPage;
