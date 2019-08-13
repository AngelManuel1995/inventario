$rango=0..254
$rango|ForEach-Object {
   $direccion="192.168.1.$_"
   Write-Progress "haciendo un barrrido de red" $direccion -PercentComplete (($_/$rango.count)*100)
   New-Object psobject -Property @{
   direccion = $direccion
   respuesta= Test-Connection $direccion -Quiet -Count 1
                                   }
                       }