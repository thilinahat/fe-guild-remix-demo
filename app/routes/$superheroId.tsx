import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { FC } from "react";
import React from "react";
import { readOneFromStore } from "~/utils/readOneFromStore";
import type { Superhero } from "./superheroes";

export const loader = async ({
  params,
}: {
  params: any;
}): Promise<Superhero> => {
  const hero = await readOneFromStore(params.superheroId);
  return hero;
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.title,
  };
};

export function links() {
  return [
    { rel: "stylesheet", href: "/styles/superhero.css" },
    {
      rel: "preload",
      href: "/images/bg-hero.jpg",
      as: "image",
    },
  ];
}

const SuperheroComponent: FC = () => {
  const superhero = useLoaderData();

  return (
    <div className="center">
      <h3 className="superhero">{`${superhero.name}, aka -> ${superhero.title}`}</h3>
      <img className="bg-hero" src="/images/bg-hero.jpg" width="1000" height="500" alt="hero" />
    </div>
  );
};

export default SuperheroComponent;
