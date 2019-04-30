<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 29/04/2019
 * Time: 15:22
 */

namespace App\Classes\CreateDBSeed\DB;


class DBBook
{
    protected static $start_db_data = [
        ['category_ids' => [2,3,4,5,6] , 'isbn' => '978-149118661' , 'author' => 'Robin Nixon' , 'price' => '999' , 'title' => 'Learn PHP ,MYSQL & Javascript with JQuery  , CSS and HTML 5' ] ,
        ['category_ids' => [1] , 'isbn' => '978-0596804848' , 'author' => 'Robin Nixon' , 'price' => '1299' , 'title' => 'Ubuntu : Up and Running a power users desktop guide' ] ,
        ['category_ids' => [1] , 'isbn' => '978-1118999875' , 'author' => 'Christofer Negus' , 'price' => '1999' , 'title' => 'Linux Bible' ] ,
        ['category_ids' => [2] , 'isbn' => '978-0596517748' , 'author' => 'Douglas Cockford' , 'price' => '899' , 'title' => 'Javascript the good Parts' ] ,
        ['category_ids' => [3] , 'isbn' => '978-1491905012' , 'author' => 'Josh Lockhart' , 'price' => '1899' , 'title' => 'Modern PHP , New Features and Good Practices' ] ,
        ['category_ids' => [3,6] , 'isbn' => '978-1491905123' , 'author' => 'Lynn Beighley & Michael Morrison' , 'price' => '1500' , 'title' => 'PHP & MySQL Novice to Ninja' ] ,
        ['category_ids' => [3,6] , 'isbn' => '978-1491905124' , 'author' => 'Head First PHP & MySQL' , 'price' => '1600' , 'title' => 'Head First PHP & MySQL' ] ,
        ['category_ids' => [3] , 'isbn' => '978-1491905125' , 'author' => 'Vikram Vaswani' , 'price' => '1000' , 'title' => 'PHP: A Beginner’s Guide' ] ,
        ['category_ids' => [3] , 'isbn' => '978-1491905126' , 'author' => 'Daginn Reiersol, Chris Shiflett, and Marcus Baker' , 'price' => '1000' , 'title' => 'PHP In Action: Objects, Design, Agility' ] ,
        ['category_ids' => [3,6,2,4] , 'isbn' => '978-1491905127' , 'author' => 'Robin Nixon, Chris Shiflett, and Marcus Baker' , 'price' => '1000' , 'title' => 'Learning PHP, MySQL, JavaScript, & CSS: A Step-by-Step Guide to Creating Dynamic Websites' ] ,
        ['category_ids' => [3] , 'isbn' => '978-1491905128' , 'author' => 'Kevin Tatroe, Peter MacIntyre ' , 'price' => '1000' , 'title' => 'Programming PHP: Creating Dynamic Web Pages' ] ,
        ['category_ids' => [2] , 'isbn' => '978-1491905129' , 'author' => 'Douglas Crockford' , 'price' => '800' , 'title' => 'Javascript , The Good Parts' ] ,
        ['category_ids' => [2] , 'isbn' => '978-1491905130' , 'author' => 'David Flanagan' , 'price' => '800' , 'title' => 'Javascript , The Definitive Guide' ] ,
        ['category_ids' => [2] , 'isbn' => '978-1491905131' , 'author' => 'Kyle Simpson' , 'price' => '800' , 'title' => 'You Don’t Know JS' ] ,
        ['category_ids' => [2] , 'isbn' => '978-1491905132' , 'author' => 'Reginald Braithwaite' , 'price' => '800' , 'title' =>  'JavaScript Allongé: The Six Edition' ] ,
        ['category_ids' => [1] , 'isbn' => '978-1491905133' , 'author' => 'Evi Nemeth' , 'price' => '800' , 'title' => 'Unix and Linux System Administration Handbook' ] ,
        ['category_ids' => [1] , 'isbn' => '978-1491905134' , 'author' => 'Æleen Frisch' , 'price' => '800' , 'title' => 'Tools and Techniques for Linux and Unix Administration, 3rd Edition' ] ,
        ['category_ids' => [1] , 'isbn' => '978-1491905135' , 'author' => 'Brian Ward' , 'price' => '800' , 'title' => 'How Linux Works: What Every Superuser Should Know' ] ,
        ['category_ids' => [1] , 'isbn' => '978-1491905136' , 'author' => 'William E. Shotts Jr' , 'price' => '800' , 'title' => 'The Linux Command Line: A Complete Introduction' ] ,
        ['category_ids' => [1] , 'isbn' => '978-1491905137' , 'author' => 'Thomas A. Limoncelli' , 'price' => '800' , 'title' => 'Practice of System and network Administration' ] ,
        ['category_ids' => [1] , 'isbn' => '978-1491905138' , 'author' => 'Maurice J. Bach' , 'price' => '800' , 'title' => 'The Design of the UNIX Operating System' ] ,
        ['category_ids' => [4,5] , 'isbn' => '978-1491905139' , 'author' => 'Ben Frain' , 'price' => '1500' , 'title' => 'Responsive Web Design with HTML5 and CSS3' ] ,
        ['category_ids' => [5] , 'isbn' => '978-1491905140' , 'author' => 'Terry Felke-Morris' , 'price' => '1500' , 'title' => 'Web Development and Design Foundations with HTML5' ] ,
        ['category_ids' => [4,5] , 'isbn' => '978-1491905141' , 'author' => 'Timothy Samara' , 'price' => '1500' , 'title' => 'Web design books for layout design' ] ,
        ['category_ids' => [4] , 'isbn' => '978-1491905143' , 'author' => 'Jennifer Kyrnin' , 'price' => '1500' , 'title' => 'Bootstrap in 24 Hours' ] ,
        ['category_ids' => [4] , 'isbn' => '978-1491905144' , 'author' => 'Syed Fazle Rahman' , 'price' => '1500' , 'title' => 'Jump Start Bootstrap: Get Up to Speed With Bootstrap in a Weekend' ] ,
        ['category_ids' => [3,6] , 'isbn' => '978-1491977145' , 'author' => 'Frank Kromann' , 'price' => '1500' , 'title' => 'Beginning PHP and MySQL' ] ,
        ['category_ids' => [6] , 'isbn' => '978-1491977146' , 'author' => 'Eric Vanier' , 'price' => '1500' , 'title' => 'Mastering MySQL 8' ] ,
        ['category_ids' => [3,6] , 'isbn' => '978-1491977147' , 'author' => 'Mike McGrath' , 'price' => '1500' , 'title' => 'PHP & MySQL in easy steps' ] ,
        ['category_ids' => [2,3,6] , 'isbn' => '978-1491977148' , 'author' => 'Andrew Caya' , 'price' => '1500' , 'title' => 'Mastering the Faster Web with PHP, MySQL and JavaScript' ] ,



    ];





    public static function start_db() {
        return static::$start_db_data;
    }
}