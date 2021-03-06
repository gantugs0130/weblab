<?php
    require_once './logic/initialize.php';
    $returnText = '';

    if (is_post_request()) {
        if (isset($_POST['student_id']) && isset($_POST['xml'])) {
            header('Content-Type: text/xml');
            $id = $_POST['student_id'];

            $student = find_student_by_id($id);

            $courses = find_all_course();
            $course_enrollments = find_all_course_enrollment_by_student_id($id);
            $returnText = '<data>';

            $returnText .= '<student_id>'.$student['student_id'].'</student_id>';

            $returnText .= '<course_enrollments>';
            foreach ($course_enrollments as $enrolled) {
                $returnText .= '<enrolled>';
                $returnText .= '<course_id>'.$enrolled['course_id'].'</course_id>';
                $returnText .= '</enrolled>';
            }
            $returnText .= '</course_enrollments>';
            $returnText .= '<courses>';

            foreach ($courses as $course) {
                if ($course['program_id'] == $student['fk_program_id']) {
                    $returnText .= '<course>';
                    $returnText .= '<course_id>'.$course['course_id'].'</course_id>';
                    $returnText .= '<program_id>'.$course['program_id'].'</program_id>';
                    $returnText .= '<course_name>'.$course['course_name'].'</course_name>';
                    $returnText .= '<credit>'.$course['credit'].'</credit>';
                    $returnText .= '</course>';
                }
            }

            $returnText .= '</courses>';
            $returnText .= '</data>';

            echo $returnText;
        }
        if (isset($_POST['student_id']) && !isset($_POST['xml'])) {
            $id = $_POST['student_id'];

            $student = find_student_by_id($id);

            $courses = find_all_course();
            $course_enrollments = find_all_course_enrollment_by_student_id($id);

            // Aaash chinchaa ene [ daraah space hergtei shu xxa!
            $returnText .= '{ "course_enrollments": [ ';

            foreach ($course_enrollments as $enrolled) {
                $returnText .= json_encode($enrolled).',';
            }
            $returnText = substr($returnText, 0, -1);
            $returnText .= '], "courses": [';

            foreach ($courses as $course) {
                $returnText .= json_encode($course).',';
            }
            $returnText = substr($returnText, 0, -1);

            $returnText .= ']}';

            echo $returnText;
        }

        if (isset($_POST['confirm'])) {
            header('Content-Type: application/json');
            $data = json_decode($_POST['confirm'], true);
            if (sizeof($data[array_keys($data)[0]])) {
                echo 'Confirmed '.json_encode($data);
            } else {
                echo 'Must Enroll At least one course, or contact staff.';
            }
        }
    }

    if (is_get_request() && isset($_GET['user_id'])) {
        $returnText .= '<span>';
        $user_id = $_REQUEST['user_id'];

        if ($student = find_student_by_id($user_id)) {
            $returnText .= '<span class="text-danger">Already Exist!</span><br/>';
            $returnText .= '<span class="text-info">User Id Recommendations:</span><br/>';

            $i = 0;
            while ($i < 2) {
                $number = rand(1, 9);
                $s = substr(str_shuffle(str_repeat('abcdefghijklmnopqrstuvwxyz', 2)), 0, 2);
                $rec_id = 's'.$s.$number;

                if (find_student_by_id($rec_id)) {
                    continue;
                }
                $returnText .= $rec_id.'<br/>';
                ++$i;
            }
        } else {
            $returnText .= '<span class="text-success">OK!</span>';
        }

        echo $returnText.'</span>';
    }
