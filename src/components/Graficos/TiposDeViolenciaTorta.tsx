// Hooks
import { useEffect, useState } from 'react';
// ReChart
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

type DenunciasDivisionesComisariasTortaProps = {
  tipos_de_violencia: { [tipo: string]: number }
  aspect?: number
}

function TiposDeViolencia({tipos_de_violencia, aspect}: DenunciasDivisionesComisariasTortaProps) {
  
  const [chartData, setChartData] = useState<any[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const format = (tipo: string) => {
    // Elimina los - y remplazalos por espacios y pon en mayúscula la primer palabra
    switch (tipo) {
      case 'Economica_y_patrimonial':
        return 'Económica y Patrimonial';
      case 'Politica':
        return 'Política';  
      case 'Psicologica':
        return 'Psicológica';
      case 'Fisica':
        return 'Física';
      case 'Simbolica':
        return 'Simbólica';
      default:
        return tipo.split('_').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');
    }
    }

  useEffect(() => {
    const data = Object.entries(tipos_de_violencia)
    .filter(([key]) => key !== 'Total')
    .map(([key, value]) => (
  
      {
      name: format(key),
      value: ((value / tipos_de_violencia.Total) * 100) ,
    }));
    setChartData(data);
    const baseHue = 200; // Hue for #0C4A6E
    const baseSaturation = 85; // Saturation for #0C4A6E
    const baseLightness = 22; // Lightness for #0C4A6E
    
    const dynamicColors = data.map((_, index) => {
      const hueVariation = (index * 10) % 360; // Adjust hue slightly for variation
      const saturationVariation = baseSaturation + (index % 2 === 0 ? 5 : -5); // Slightly vary saturation
      const lightnessVariation = baseLightness + (index % 2 === 0 ? 5 : -5); // Slightly vary lightness
      return `hsl(${(baseHue + hueVariation) % 360}, ${saturationVariation}%, ${lightnessVariation}%)`;
    });
    setColors(dynamicColors);    
  }, [tipos_de_violencia]);
  
  return (
    <ResponsiveContainer width="100%" aspect={aspect || 1} >
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label = {({name, value}) => `${name} (${value.toFixed(2)}%)`}
      >
        {/* @ts-ignore */}
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </ResponsiveContainer>

)
}

export default TiposDeViolencia