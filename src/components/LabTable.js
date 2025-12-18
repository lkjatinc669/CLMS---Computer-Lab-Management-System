import PCVisual from "./PCVisual"

export default function LabTable({ table_name }) {
    const tableName = table_name;
    return (
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 p-4">
            {["PC1", "PC2", "PC3", "PC4"].map((pcName)=>{
                return <PCVisual tableName={tableName} pcName={pcName} key={pcName}/>
            })}
        </div>
    )
}
