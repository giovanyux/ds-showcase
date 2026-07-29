export function CaseStudy() {
  return (
    <section className="space-y-8 max-w-2xl">
      <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
        Por trás dos tokens
      </h2>

      <div className="space-y-6 text-base leading-relaxed text-foreground/90">
        <p>
          Um design system não é só uma coleção de componentes bonitos — é o ponto onde as
          decisões de produto viram interface, sem depender de mais uma reunião pra alinhar. O
          Prumo nasceu com isso resolvido no nível técnico: 58 componentes, tokens, dark mode.
          Faltava a identidade — a base visual era teal com neutros frios, o &ldquo;padrão&rdquo;
          que qualquer gerador de tema entrega.
        </p>

        <p>
          A mudança começou pela cor. Trocar o teal genérico por um laranja queimado extraído de
          uma peça de identidade real — não escolhido num color picker — resolveu dois problemas
          ao mesmo tempo: deu personalidade ao sistema e, de quebra, fechou uma dívida de
          contraste que já estava documentada no próprio código (o teal original vinha marcado
          &ldquo;revisar contraste&rdquo; havia tempo). O tom foi refinado depois — mais vívido,
          menos marrom — mas passa de 5:1 contra branco em qualquer variação testada.
        </p>

        <blockquote className="border-l-2 border-primary pl-4 text-lg font-display text-foreground">
          Consistência de raciocínio importa mais que consistência de número.
        </blockquote>

        <p>
          O raio de borda seguiu a mesma lógica. Não é mais &ldquo;6px porque é o meio-termo
          entre Linear e Notion&rdquo; — é 10px porque a peça de identidade que guiou o resto do
          sistema já tinha essa generosidade nos cantos, do chip de link ao card. A tipografia
          dupla — Zen Kaku Gothic New nos títulos, Inter no corpo — existe porque um sistema real
          quase nunca usa uma fonte só: título de marketing pede personalidade, formulário e
          tabela densa pedem legibilidade sem distração.
        </p>

        <p className="text-muted-foreground">
          Nada disso veio de uma pesquisa com usuário — o Prumo é, antes de tudo, uma peça pra
          mostrar como penso decisões de design de ponta a ponta. Mas o raciocínio por trás de
          cada token é real, e é isso que fica documentado aqui: não só o resultado, o porquê.
        </p>
      </div>
    </section>
  );
}
