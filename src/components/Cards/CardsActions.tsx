import { NavLink } from 'react-router-dom';

type Props = {
  mostrar: string;
  url: string;
  SVGIcon: any;
};

export default function CardsActions({
  mostrar,
  url,
  SVGIcon
}: Props): JSX.Element {
  return (
    <NavLink to={url}>
      <div className="rounded-lg md:h-32 lg:h-24 xl:h-20 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-sky-900 hover:bg-sky-950 transform transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="flex flex-row md:flex-col md:items-center lg:flex-row lg:items-start justify-between">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-50">
            {mostrar}
          </h5>
          {SVGIcon ? <SVGIcon className="w-6 h-6 text-white" /> : null}
        </div>
      </div>
    </NavLink>
  );
}