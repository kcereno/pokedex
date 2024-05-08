import { EvolutionChainLink } from '~/types/pokemon';

type EvolutionLinkProps = {
  chainLink: EvolutionChainLink;
};

function EvolutionLink({ chainLink }: EvolutionLinkProps) {
  return <div>EvolutionLink</div>;
}

export default EvolutionLink;
