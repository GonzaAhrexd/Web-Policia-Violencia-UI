import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';


type DenunciasDivisionesComisariasTortaProps = {
    comisarias: number;
    division: number;
    aspect?: number;
}

function DenunciasDivisionesComisariasTorta({aspect, comisarias, division}: DenunciasDivisionesComisariasTortaProps) {

    const data = [
        { name: 'Comisarías', value: comisarias },
        { name: 'División', value: division },
      ];

      const COLORS = ['#082F49', '#413EA0'];

      const RADIAN = Math.PI / 180;
 
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };
      
  return (
    <ResponsiveContainer width="100%" aspect={aspect || 1} >
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {/* @ts-ignore  */}
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  </ResponsiveContainer>
)
}

export default DenunciasDivisionesComisariasTorta