<article>
<div class="row">
  <div class="column">
    <div class="pre_parent">
    <pre>





                    (%       ((((
                        (((((((  ((((((
                        %(    ((((((#(((
                         &((((((((((((((((
                       ((((((((((((((((((((((
                     (((((((((((//(((((( ((((((
                   %((((((((/**********/(((((((
                    ((((((//****       ****/(((((((((#
                   ((((((((*     #(((((((   *******/(
                   ((((((((    ((((  %(((
                   (((((((           #(((((
                   ((((((( (         ((((((((((((
                   ( ((((((           (((((((((((((((((
                      (((((((          (((((((((((((((((((
                       ((((((       (  %(((((((((((((((((((((
                          (((     %((  (((((((((((((((((((((((&
                            (     ((((((((((((((((((((((((((((((
                                   ((((((((((((((((((((((((((((((
                %((((((((((((((((%   (((((((((((((((((((((((((((((
             (((((((((((((((((((((((((((# ((((((((((( ((((((((((((
          ((((((((         ((((((((((((((((((((        ((((((((((((
        ((((((                 %(((((((((((((((((((((((((((((((((((
      %(((((((((                  ((((((((((((((((((((((((((((((((
     ((((    ((((((((((                (((((((( ((((((((((((((((((
                    (((((((                %((((((((((((( (((((((
                        ((((((&        (((((((((((     #(((((((
                            (((((((                 ((((((((
                                 &(((((((((((((((((((((
    </pre>
    </div>
  </div>
<div class="column">
<h1 id="lishex-codename-1f98a-">Lishex (codename 1F98A)</h1>
<p>A UCI chess-engine built in C++.</p>
<h3 id="features">Features</h3>
<ul>
<li>Universal Chess Interface (UCI) compatible.</li>
<li>Hybrid board representation <ul>
<li><a href="https://www.chessprogramming.org/Bitboards">Bitboard</a> representation for move generation and evaluation</li>
<li>Square centric <a href="https://www.chessprogramming.org/8x8_Board">8x8 board</a> for quick piece-lookup during move making</li>
</ul>
</li>
<li>Iterative deepening <a href="https://www.chessprogramming.org/Negamax">Negamax framework</a><ul>
<li><a href="https://www.chessprogramming.org/Alpha-Beta">Alpha-Beta pruning</a></li>
<li><a href="https://www.chessprogramming.org/Principal_Variation_Search">Principal variation search</a></li>
<li>Aspiration windows with PVS</li>
<li><a href="https://www.chessprogramming.org/Quiescence_Search">Quiescence search</a></li>
<li>Most Valuable Victim Least Valuable Attacker (<a href="https://www.chessprogramming.org/MVV-LVA">MVV-LVA</a>) heuristic </li>
<li><a href="https://www.chessprogramming.org/Killer_Heuristic">Killer move heuristic</a></li>
<li><a href="https://www.chessprogramming.org/History_Heuristic">History heuristic</a></li>
<li><a href="https://www.chessprogramming.org/Null_Move_Pruning">Null-move pruning</a></li>
<li><a href="https://www.chessprogramming.org/Transposition_Table">Transposition tables</a> to store results of previously performed searches (based on <a href="https://www.chessprogramming.org/Zobrist_Hashing">Zobrist</a> hashes)</li>
<li><a href="https://www.chessprogramming.org/Late_Move_Reductions">Late move reduction</a></li>
<li><a href="https://www.chessprogramming.org/Futility_Pruning">Futility pruning</a></li>
<li>Razoring</li>
<li>Basic king safety (king danger zone, pawn shield, pawn storm)</li>
<li>Check extension</li>
</ul>
</li>
<li>Tapered PeSTO&#39;s <a href="https://www.chessprogramming.org/Piece-Square_Tables">Piece-square tables</a> for static position evaluation interpolated between different game stages </li>
<li>Static Exchange Evaluation (SEE) to detect losing captures</li>
<li><a href="https://www.chessprogramming.org/Mobility">Mobility scores</a></li>
<li><a href="https://www.chessprogramming.org/Automated_Tuning">Parameter fine-tuning</a> (based on Texel&#39;s tuning method) - stochastically optimized with 
a basic implementation of Adam (in mini-batch mode)</li>
<li>Doxygen-generated documentation</li>
</ul>
</div>
</div>
<div class="row">
    <div class="column">
        <h3 id="how-to">How to</h3>
        <p>Lishex does not come with its own grapical user interface (GUI).  Instead, it implements the <a href="https://www.chessprogramming.org/UCI">UCI</a> protocol making it compatible with most popular chess GUIs such as:</p>
        <ul>
        <li><a href="http://www.playwitharena.de/">Arena Chess GUI</a> (free)</li>
        <li><a href="https://chessbase.com/">Chessbase</a> (paid)</li>
        <li><a href="https://cutechess.com/">Cutechess</a> (free)</li>
        <li><a href="https://banksiagui.com/">BanksiaGUI</a> (free)</li>
        <li><a href="https://github.com/fohristiwhirl/nibbler/releases">Nibbler</a> (free).</li>
        </ul>
    </div>
    <div class="column">
        <h3 id="todos">TODOs</h3>
        Lishex is a work in progress and there are many features that I would like to implement in the future.  These include:
        <ul>
        <li>More <a href="https://www.chessprogramming.org/Extensions">search extensions</a>: extending search depth in specific subtrees to combat the <a href="https://www.chessprogramming.org/Horizon_Effect">horizon effect</a></li>
        <li><a href="https://www.chessprogramming.org/Parallel_Search">LazySMP</a> for parallel searching on multiple threads</li>
        <li>More sophisticated king safety (including queen distance, tropism)</li>
        <li>Endgame tablebase probing</li>
        <li>Extension limiting</li>
        <li>Smarter time control logic, estimated time to finish search</li>
        <li>Chess960 (Fisher Random Chess) support</li>
        <li>NNUE</li>
        </ul>
    </div>
</div>
<div class="row">
  <div class="column">
    <h3 id="download">Source code</h3>
    <div class="pre_parent">
    <p>You can find the project repository <a href="https://www.github.com/MKJM2/lishex">here</a>.</p>
    </div>
  </div>
</div>
</article>

<style>
article {
  /* padding-top: 2rem; */
  min-height: 90vh;
}
.row {
  display: flex;
  flex-wrap: wrap;
}

.pre_parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

.column {
  flex: 50%;
  box-sizing: border-box;
  padding: 10px;
}

.column h3 {
    text-align: center
}

/* Media query for screens smaller than 600 pixels */
@media screen and (max-width: 600px) {
  .column {
    flex: 100%; /* Make columns take up 100% width */
  }
}

</style>
