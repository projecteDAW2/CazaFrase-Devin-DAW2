<?php
session_start();
$data = json_decode(file_get_contents('php://input'), true);

if ($data['action'] == 'selectScores') {
    selectScores();
}

if ($data['action'] == 'updateUserGame') {
    $user = isset($_SESSION['userActivo']) ? $_SESSION['userActivo'] : "";
    $score = $data['score'];

    updateUserGame($score, $user);   
}

function openBd()
{
    $servername = "localhost";
    $username = "root";
    $password = "";

    $connection = new PDO("mysql:host=$servername;dbname=gadi", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $connection->exec("set names utf8");

    return $connection;
}

function closeBd()
{
    return null;
}

function selectUserNicknames($user_id)
{
    $connection = openBd();

    $consulta = "SELECT nickname FROM users WHERE id = :id";

    $consultaSelect = $connection->prepare($consulta);
    $consultaSelect->bindParam(':id', $user_id);
    $consultaSelect->execute();

    $result = $consultaSelect->fetchAll();

    $connection = closeBd();

    return $result;
}

function updateUserGame($score, $user)
{
    $connection = openBd();
    try {
        $connection->beginTransaction();

        $id_user = $user['id'];
        $consultaSelect = "SELECT score FROM juego_user WHERE idJuego =4 AND idUser = :id_user";
        $query = $connection->prepare($consultaSelect);
        $query->bindParam(':id_user', $id_user);
        $query->execute();

        $scoreExistente = $query->fetchAll(PDO::FETCH_ASSOC);

        if($scoreExistente[0]['score'] < $score){
            $consulta = "UPDATE juego_user SET juegoCompleto = 1, score =:score
            WHERE idUser =:id_user AND idJuego = 4";

            $sentence = $connection->prepare($consulta);
            $sentence->bindParam(':score', $score);
            $sentence->bindParam(':id_user', $id_user);
            $sentence->execute();
        }
        

        $connection->commit();
    } catch (PDOException $ex) {
        $connection->rollBack();
    }
    
    $connection = closeBd();
}

function selectScores()
{
    $connection = openBd();

    $consulta = "SELECT score, users.nickname, idUser, idJuego FROM juego_user 
                 JOIN users
                 WHERE idJuego = 4 AND idUser = users.id AND score > 0
                 ORDER BY score DESC LIMIT 5";

    $sentence = $connection->prepare($consulta);
    $sentence->execute();

    $result = $sentence->fetchAll(PDO::FETCH_ASSOC);

    $connection = closeBd();

    if (!empty($result)) {
        echo json_encode($result);
    } else {
        echo json_encode([]);
    }

    $connection = closeBd();
    return $result[0];
}

function selectUserScore($user){
    $connection = openBd();

    $idUser = $user['id'];

    $consulta = "SELECT score FROM juego_user WHERE idJuego = 4 AND idUser =:idUser";

    $sentence = $connection->prepare($consulta);
    $sentence->bindParam(':idUser', $idUser);
    $sentence->execute();

    $result = $sentence->fetchAll(PDO::FETCH_ASSOC);

    $connection = closeBd();

    if (!empty($result)) {
        echo json_encode($result);
    } else {
        echo json_encode([]);
    }

    $connection = closeBd();
    return $result[0];
}
