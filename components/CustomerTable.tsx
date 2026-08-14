"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { formatCep } from "@/lib/cep";
import {
  formatAddress,
  formatPhone,
  getCustomers,
  getStoreCustomers,
  type Customer,
} from "@/lib/customers";

type CustomerTableProps = {
  mode: "store" | "admin";
  storeSlug?: string;
  storeName?: string;
};

export function CustomerTable({ mode, storeSlug, storeName }: CustomerTableProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [query, setQuery] = useState("");
  const [store, setStore] = useState("todos");
  const [neighborhood, setNeighborhood] = useState("todos");
  const [city, setCity] = useState("todos");

  useEffect(() => {
    const sync = () => {
      setCustomers(
        mode === "store" && storeSlug
          ? getStoreCustomers(storeSlug)
          : getCustomers().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
      );
    };
    sync();
    window.addEventListener("conexao-commerce", sync);
    return () => window.removeEventListener("conexao-commerce", sync);
  }, [mode, storeSlug]);

  const stores = useMemo(() => {
    const names = new Map<string, string>();
    for (const customer of customers) {
      for (const item of customer.stores) names.set(item.slug, item.name);
    }
    return [...names.entries()].sort((a, b) => a[1].localeCompare(b[1], "pt-BR"));
  }, [customers]);

  const neighborhoods = useMemo(
    () =>
      [...new Set(customers.map((item) => item.neighborhood).filter(Boolean))].sort(
        (a, b) => a.localeCompare(b, "pt-BR"),
      ),
    [customers],
  );

  const cities = useMemo(
    () =>
      [...new Set(customers.map((item) => item.city).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [customers],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return customers.filter((customer) => {
      if (store !== "todos" && !customer.stores.some((item) => item.slug === store)) {
        return false;
      }
      if (neighborhood !== "todos" && customer.neighborhood !== neighborhood) {
        return false;
      }
      if (city !== "todos" && customer.city !== city) {
        return false;
      }
      if (!term) return true;
      const haystack = [
        customer.name,
        customer.phone,
        formatPhone(customer.phone),
        customer.cep,
        customer.street,
        customer.neighborhood,
        customer.city,
        ...customer.stores.map((item) => item.name),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [city, customers, neighborhood, query, store]);

  const admin = mode === "admin";

  return (
    <div className="border border-line bg-surface/70 px-5 py-7 sm:px-8">
      <p className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase">
        {admin ? "Base geral" : "Clientes desta loja"}
      </p>
      <h2 className="mt-3 font-display text-[1.7rem] leading-tight tracking-[0.04em] text-foreground uppercase sm:text-[2rem]">
        {admin ? "Todos os clientes" : "Quem comprou aqui"}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
        {admin
          ? "Nome, WhatsApp, CEP, rua, bairro e cidade de toda a rede. Use bairro e cidade para campanhas depois."
          : `Cadastros de quem pediu em ${storeName ?? "esta loja"}. O endereço entra pelo CEP no checkout.`}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <Metric label="Clientes" value={filtered.length} />
        <Metric label="Bairros" value={new Set(filtered.map((item) => item.neighborhood)).size} />
        <Metric label="Cidades" value={new Set(filtered.map((item) => item.city)).size} />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar nome, WhatsApp, rua, bairro..."
          className="h-11 w-full border border-line bg-background/70 px-4 text-sm outline-none focus:border-gold/55"
        />
        <div className={`grid gap-3 ${admin ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {admin ? (
            <FilterSelect
              label="Loja"
              value={store}
              onChange={setStore}
              options={stores.map(([slug, name]) => ({ value: slug, label: name }))}
            />
          ) : null}
          <FilterSelect
            label="Bairro"
            value={neighborhood}
            onChange={setNeighborhood}
            options={neighborhoods.map((item) => ({ value: item, label: item }))}
          />
          <FilterSelect
            label="Cidade"
            value={city}
            onChange={setCity}
            options={cities.map((item) => ({ value: item, label: item }))}
          />
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-[52rem] w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <Th>Cliente</Th>
              <Th>WhatsApp</Th>
              <Th>CEP</Th>
              <Th>Nº</Th>
              <Th>Rua</Th>
              <Th>Bairro</Th>
              <Th>Cidade</Th>
              {admin ? <Th>Loja</Th> : <Th>Último pedido</Th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-sm text-muted"
                >
                  Nenhum cliente neste filtro.
                </td>
              </tr>
            ) : (
              filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-line/70 align-top">
                  <Td>
                    <p className="text-foreground">{customer.name}</p>
                    <p className="mt-1 hidden text-xs text-muted sm:block">
                      {formatAddress(customer)}
                    </p>
                  </Td>
                  <Td>
                    <a
                      href={`https://wa.me/55${customer.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-soft"
                    >
                      {formatPhone(customer.phone)}
                    </a>
                  </Td>
                  <Td>{formatCep(customer.cep)}</Td>
                  <Td>{customer.number}</Td>
                  <Td>{customer.street}</Td>
                  <Td>{customer.neighborhood}</Td>
                  <Td>
                    {customer.city}
                    {customer.state ? ` - ${customer.state}` : ""}
                  </Td>
                  {admin ? (
                    <Td>
                      {customer.stores.map((item) => item.name).join(", ")}
                    </Td>
                  ) : (
                    <Td>
                      {formatDay(
                        customer.stores.find((item) => item.slug === storeSlug)
                          ?.lastOrderAt ?? customer.updatedAt,
                      )}
                    </Td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-line bg-background/50 px-3 py-4 sm:px-4">
      <p className="font-sans text-[9px] tracking-[0.2em] text-muted uppercase">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl leading-none text-foreground sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="font-sans text-[9px] tracking-[0.2em] text-muted uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full border border-line bg-background/70 px-3 text-sm text-foreground outline-none focus:border-gold/55"
      >
        <option value="todos">Todos</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Th({ children }: { children: string }) {
  return (
    <th className="whitespace-nowrap px-3 py-3 font-sans text-[9px] font-medium tracking-[0.18em] text-gold uppercase">
      {children}
    </th>
  );
}

function Td({ children }: { children: ReactNode }) {
  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">{children}</td>
  );
}

function formatDay(value: string) {
  return new Date(value).toLocaleDateString("pt-BR");
}
